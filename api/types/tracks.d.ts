export type SpotifyTrackSchema = {
  name: string;
  artists: Array<{
    name: string;
  }>;
  album: {
    name: string;
    images?: Array<{
      url: URL;
    }>;
  };
  imageUrl?: URL;
  external_urls: {
    spotify: URL;
  };
};

export type SpotifyActivitySchema = {
  is_playing: boolean;
  item?: SpotifyTrackSchema;
};

export type SpotifyTokenSchema = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export type SpotifyTopSchema = {
  items: SpotifyTrackSchema[];
};

export type Track = {
  isPlaying?: boolean;
  artist?: string;
  title?: string;
  album?: string;
  imageUrl?: URL;
  songUrl?: URL;
};
