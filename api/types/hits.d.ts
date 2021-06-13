type PageStats = {
  title?: string;
  url?: string;
  date?: string;
  slug: string;
  hits: number;
  pretty_hits: string;
  pretty_unit: string;
};

type OverallStats = {
  total: {
    hits: number;
    pretty_hits?: string;
    pretty_unit?: string;
  };
  pages: PageStats[];
};
