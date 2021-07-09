type PageStats = {
  title?: string;
  url?: string;
  date?: string;
  slug: string;
  hits: number;
};

type OverallStats = {
  total: {
    hits: number;
  };
  pages: PageStats[];
};
