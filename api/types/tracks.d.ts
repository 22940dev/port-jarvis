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

type Activity = {
  is_playing: boolean;
  item?: TrackSchema;
};
