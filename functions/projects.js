"use strict";

const { GraphQLClient, gql } = require("graphql-request");
const { escape } = require("html-escaper");
const numeral = require("numeral");
const { DateTime } = require("luxon");

const username = "jakejarvis";
const endpoint = "https://api.github.com/graphql";

async function fetchRepos(sort, limit) {
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

  const response = await client.request(query, { sort, limit });

  const currentRepos = response.user.repositories.edges.map(({ node: repo }) => ({
    ...repo,
    description: escape(repo.description),
    stargazerCount_pretty: numeral(repo.stargazerCount).format("0,0"),
    forkCount_pretty: numeral(repo.forkCount).format("0,0"),
    pushedAt_relative: DateTime.fromISO(repo.pushedAt).toRelative({ locale: "en" }),
  }));

  return currentRepos;
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
