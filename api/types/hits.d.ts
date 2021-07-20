export type PageStats = {
  slug: string;
  hits: number;
  title?: string;
  url?: URL;
  date?: Date;
};

export type OverallStats = {
  total: {
    hits: number;
  };
  pages: PageStats[];
};
