// Fetches my Spotify most-played tracks or currently playing track.
// Heavily inspired by @leerob: https://leerob.io/snippets/spotify

import * as Sentry from "@sentry/node";
import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
import * as queryString from "query-string";

import type { Track, SpotifyTrackSchema, SpotifyActivitySchema } from "./types/tracks";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

// https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
// https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-the-users-currently-playing-track
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
// https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10`;

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || "",
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // some rudimentary error handling
    if (req.method !== "GET") {
      throw new Error(`Method ${req.method} not allowed.`);
    }
    if (
      !process.env.SPOTIFY_CLIENT_ID ||
      !process.env.SPOTIFY_CLIENT_SECRET ||
      !process.env.SPOTIFY_REFRESH_TOKEN
    ) {
      throw new Error("Spotify API credentials aren't set.");
    }

    // default to top tracks
    let response;
    // get currently playing track (/music/?now), otherwise top 10 tracks
    if (typeof req.query.now !== "undefined") {
      response = await getNowPlaying();

      // let Vercel edge and browser cache results for 5 mins
      res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300, stale-while-revalidate");
    } else {
      response = await getTopTracks();

      // let Vercel edge and browser cache results for 3 hours
      res.setHeader(
        "Cache-Control",
        "public, max-age=10800, s-maxage=10800, stale-while-revalidate"
      );
    }

    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(response);
  } catch (error) {
    console.error(error);

    // log error to sentry, give it 2 seconds to finish sending
    Sentry.captureException(error);
    await Sentry.flush(2000);

    const message = error instanceof Error ? error.message : "Unknown error.";

    res.status(400).json({ success: false, message: message });
  }
};

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  return response.json();
};

const getNowPlaying = async (): Promise<Track> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      // eslint-disable-next-line camelcase
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const active: SpotifyActivitySchema = await response.json();

  if (active.is_playing === true && active.item) {
    return {
      isPlaying: active.is_playing,
      artist: active.item.artists.map((_artist) => _artist.name).join(", "),
      title: active.item.name,
      album: active.item.album.name,
      imageUrl: active.item.album.images ? active.item.album.images[0].url : undefined,
      songUrl: active.item.external_urls.spotify,
    };
  } else {
    return { isPlaying: false };
  }
};

const getTopTracks = async (): Promise<Track[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { access_token } = await getAccessToken();

  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      // eslint-disable-next-line camelcase
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { items } = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const tracks: Track[] = items.map((track: Readonly<SpotifyTrackSchema>) => ({
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    title: track.name,
    album: track.album.name,
    imageUrl: track.album.images ? track.album.images[0].url : undefined,
    songUrl: track.external_urls.spotify,
  }));

  return tracks;
};
