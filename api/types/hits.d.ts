export type PageStats = {
  slug: string;
  hits: number;
  title?: string;
  url?: string;
  date?: string;
};

export type OverallStats = {
  total: {
    hits: number;
  };
  pages: PageStats[];
};
