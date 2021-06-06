"use strict";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { escape } from "html-escaper";
import { DateTime } from "luxon";
import numeral from "numeral";
import { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";

const username = "jakejarvis";
const endpoint = "https://api.github.com/graphql";

async function fetchRepos(sort: string, limit: number) {
  // https://docs.github.com/en/graphql/guides/forming-calls-with-graphql
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.GH_PUBLIC_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  // https://docs.github.com/en/graphql/reference/objects#repository
  const query = gql`
    query ($sort: String, $limit: Int) {
      user(login: "${username}") {
        repositories(
          first: $limit,
          isLocked: false,
          isFork: false,
          ownerAffiliations: OWNER,
          privacy: PUBLIC,
          orderBy: {
            field: $sort,
            direction: DESC
          }
        ) {
          edges {
            node {
              name
              url
              description
              pushedAt
              stargazerCount
              forkCount
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

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

  const response = await client.request(query, { sort, limit });
  const currentRepos: Repository[] = response.user.repositories.edges.map(
    ({ node: repo }: { [key: string]: Repository }) => ({
      ...repo,
      description: escape(repo.description),
      stargazerCount_pretty: numeral(repo.stargazerCount).format("0,0"),
      forkCount_pretty: numeral(repo.forkCount).format("0,0"),
      pushedAt_relative: DateTime.fromISO(repo.pushedAt).toRelative({ locale: "en" }),
    })
  );

  return currentRepos;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // some rudimentary error handling
    if (req.method !== "GET") {
      throw new Error(`Method ${req.method} not allowed.`);
    }
    if (!process.env.GH_PUBLIC_TOKEN) {
      throw new Error("GitHub API credentials aren't set.");
    }

    // default to latest repos
    let sortBy = "PUSHED_AT";
    // get most popular repos (/projects/?top)
    if (typeof req.query.top !== "undefined") sortBy = "STARGAZERS";

    const repos = await fetchRepos(sortBy, 16);

    // let Vercel edge cache results for 15 mins
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(repos);
  } catch (error) {
    console.error(error);

    res.status(400).json({ message: error.message });
  }
};
