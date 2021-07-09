type Repository = {
  name: string;
  url: string;
  description: string;
  primaryLanguage?: {
    color: string;
    name: string;
  };
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
};
