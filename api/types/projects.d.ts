import type { Language } from "@octokit/graphql-schema";

export type Repository = {
  name: string;
  url: string;
  description: string;
  primaryLanguage?: Language;
  stargazerCount: number;
  forkCount: number;
  pushedAt: string;
};
