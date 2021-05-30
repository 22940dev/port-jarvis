"use strict";

const faunadb = require("faunadb"),
  q = faunadb.query;
const numeral = require("numeral");
const pluralize = require("pluralize");
require("dotenv").config();

// .....??????
// https://github.com/netlify/netlify-lambda/issues/201
require("encoding");

exports.handler = async (event) => {
  // some rudimentary error handling
  const { slug } = event.queryStringParameters;
  if (!slug || slug === "/") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Page slug required.",
      }),
    };
  }

  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    // refer to snippet below for the `hit` function defined in the Fauna cloud
    const result = await client.query(q.Call(q.Function("hit"), slug));

    // send client the new hit count
    return {
      statusCode: 200,
      headers: {
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Expires: "0",
        Pragma: "no-cache",
      },
      body: JSON.stringify({
        slug: result.data.slug,
        hits: result.data.hits,
        pretty_hits: numeral(result.data.hits).format("0,0"),
        pretty_unit: pluralize("hit", result.data.hits),
      }),
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

/**

This is the FaunaDB function named `hit` defined in the cloud:
https://dashboard.fauna.com/functions/hit/@db/global/jarv.is
https://docs.fauna.com/fauna/current/api/fql/user_defined_functions

{
  name: "hit",
  role: null,
  body: Query(
    Lambda(
      "slug",
      Let(
        { match: Match(Index("hits_by_slug"), Var("slug")) },
        If(
          Exists(Var("match")),
          Let(
            {
              ref: Select("ref", Get(Var("match"))),
              hits: ToInteger(Select("hits", Select("data", Get(Var("match")))))
            },
            Update(Var("ref"), { data: { hits: Add(Var("hits"), 1) } })
          ),
          Create(Collection("hits"), { data: { slug: Var("slug"), hits: 1 } })
        )
      )
    )
  )
}

*/
