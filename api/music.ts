"use strict";

// Heavily inspired by @leerob: https://leerob.io/snippets/spotify

import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
import querystring from "querystring";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-the-users-currently-playing-track
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
// https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10`;

type TrackSchema = {
  name: string;
  artists: Array<{
    name: string;
  }>;
  album: {
    name: string;
    images: Array<{
      url: string;
    }>;
  };
  imageUrl?: string;
  external_urls: {
    spotify: string;
  };
};

type Track = {
  isPlaying: boolean;
  artist?: string;
  title?: string;
  album?: string;
  imageUrl?: string;
  songUrl?: string;
};

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  return response.json();
};

const getNowPlaying = async (): Promise<Track> => {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  type Activity = {
    is_playing: boolean;
    item?: TrackSchema;
  };

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const active: Activity = await response.json();

  if (active.is_playing === true && active.item) {
    const isPlaying = active.is_playing;
    const artist = active.item.artists.map((_artist) => _artist.name).join(", ");
    const title = active.item.name;
    const album = active.item.album.name;
    const imageUrl = active.item.album.images[0].url;
    const songUrl = active.item.external_urls.spotify;

    return {
      isPlaying,
      artist,
      title,
      album,
      imageUrl,
      songUrl,
    };
  } else {
    return { isPlaying: false };
  }
};

const getTopTracks = async (): Promise<Track[]> => {
  const { access_token } = await getAccessToken();

  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const { items } = await response.json();

  const tracks: Track[] = items.map((track: TrackSchema) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    title: track.name,
    album: track.album.name,
    imageUrl: track.album.images[0].url,
    songUrl: track.external_urls.spotify,
  }));

  return tracks;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // some rudimentary error handling
    if (req.method !== "GET") {
      throw new Error(`Method ${req.method} not allowed.`);
    }
    if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET || !process.env.SPOTIFY_REFRESH_TOKEN) {
      throw new Error("Spotify API credentials aren't set.");
    }

    // default to top tracks
    let response;
    // get currently playing track (/music/?now), otherwise top 10 tracks
    if (typeof req.query.now !== "undefined") {
      response = await getNowPlaying();

      // let Vercel edge cache results for 5 mins
      res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate");
    } else {
      response = await getTopTracks();

      // let Vercel edge cache results for 3 hours
      res.setHeader("Cache-Control", "public, s-maxage=10800, stale-while-revalidate");
    }

    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(response);
  } catch (error) {
    console.error(error);

    res.status(400).json({ message: error.message });
  }
};
