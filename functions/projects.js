"use strict";

const { GraphQLClient } = require("graphql-request");
const { escape } = require("html-escaper");
const numeral = require("numeral");
const { DateTime } = require("luxon");

const username = "jakejarvis";

async function fetchRepos(sort, limit) {
  const client = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      Authorization: `Bearer ${process.env.GH_PUBLIC_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  const query = `
    query ($sort: String, $limit: Int) {
      user(login: "${username}") {
        repositories(
          last: $limit,
          isLocked: false,
          isFork: false,
          ownerAffiliations: OWNER,
          privacy: PUBLIC,
          orderBy: {
            field: $sort,
            direction: ASC
          }
        ) {
          edges {
            node {
              name
              url
              description
              pushedAt
              stargazers {
                totalCount
              }
              forks {
                totalCount
              }
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

  const response = await client.request(query, {
    sort: sort,
    limit: limit,
  });

  const currentRepos = response.user.repositories.edges.map(({ node: repo }) => ({
    ...repo,
    description: escape(repo.description),
    stargazers: repo.stargazers.totalCount,
    stargazers_pretty: numeral(repo.stargazers.totalCount).format("0,0"),
    forks: repo.forks.totalCount,
    forks_pretty: numeral(repo.forks.totalCount).format("0,0"),
    pushedAt_relative: DateTime.fromISO(repo.pushedAt).toRelative({ locale: "en" }),
  }));

  // reverse hack to get expected sorting
  return currentRepos.reverse();
}

exports.handler = async (event) => {
  try {
    // some rudimentary error handling
    if (event.httpMethod !== "GET") {
      throw new Error(`Method ${event.httpMethod} not allowed.`);
    }
    if (!process.env.GH_PUBLIC_TOKEN) {
      throw new Error("GitHub API credentials aren't set.");
    }

    // default to latest repos
    let sortBy = "PUSHED_AT";
    // get most popular repos (/projects?top)
    if (typeof event.queryStringParameters.top !== "undefined") sortBy = "STARGAZERS";

    const repos = await fetchRepos(sortBy, 16);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(repos),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
