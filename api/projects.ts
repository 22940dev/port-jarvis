import * as Sentry from "@sentry/node";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { graphql, GraphQlQueryResponseData } from "@octokit/graphql";
import { encode } from "html-entities";

import type { Repository } from "./types/projects";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || process.env.SENTRY_ENVIRONMENT || "",
});

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

    let result;
    if (typeof req.query.top !== "undefined") {
      // get most popular repos (/projects/?top)
      result = await fetchRepos("STARGAZERS");
    } else {
      // default to latest repos
      result = await fetchRepos("PUSHED_AT");
    }

    // let Vercel edge and browser cache results for 15 mins
    res.setHeader("Cache-Control", "public, max-age=900, s-maxage=900, stale-while-revalidate");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    // log error to sentry, give it 2 seconds to finish sending
    Sentry.captureException(error);
    await Sentry.flush(2000);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.status(400).json({ message: error.message });
  }
};

const fetchRepos = async (sort: string): Promise<Repository[]> => {
  // https://docs.github.com/en/graphql/reference/objects#repository
  const { user } = await graphql<GraphQlQueryResponseData>(
    `
      query ($username: String!, $sort: String, $limit: Int) {
        user(login: $username) {
          repositories(
            first: $limit
            isLocked: false
            isFork: false
            ownerAffiliations: OWNER
            privacy: PUBLIC
            orderBy: { field: $sort, direction: DESC }
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
    `,
    {
      username: "jakejarvis",
      limit: 16,
      sort: sort,
      headers: {
        authorization: `token ${process.env.GH_PUBLIC_TOKEN}`,
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const repos: Repository[] = user.repositories.edges.map(({ node: repo }: { [key: string]: Repository }) => ({
    ...repo,
    description: encode(repo.description),
  }));

  return repos;
};
