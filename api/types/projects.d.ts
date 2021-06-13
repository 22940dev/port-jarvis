type Repository = {
  name: string;
  url: string;
  description: string;
  primaryLanguage?: {
    color: string;
    name: string;
  };
  stargazerCount: number;
  stargazerCount_pretty?: string;
  forkCount: number;
  forkCount_pretty?: string;
  pushedAt: string;
  pushedAt_relative?: string;
};
