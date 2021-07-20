import type { Language } from "@octokit/graphql-schema";

type BaseRepoInfo = {
  name: string;
  url: URL;
  description: string;
};

export type GHRepoSchema = Required<BaseRepoInfo> & {
  primaryLanguage?: Language;
  stargazerCount: number;
  forkCount: number;
  pushedAt: Date;
};

export type Repository = Required<BaseRepoInfo> & {
  language?: Language;
  stars: number;
  forks: number;
  updatedAt: Date;
};
