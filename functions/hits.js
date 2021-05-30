const faunadb = require("faunadb"),
  q = faunadb.query;
const numeral = require("numeral");
const pluralize = require("pluralize");
require("dotenv").config();

// .....??????
// https://github.com/netlify/netlify-lambda/issues/201
require("encoding");

exports.handler = async (event, context) => {
  const { slug } = event.queryStringParameters;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  // some rudimentary error handling
  if (!slug || slug === "/") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Page slug required.",
      }),
    };
  }

  const result = await client.query(
    q.Let(
      {
        match: q.Match(q.Index("hits_by_slug"), slug),
      },
      q.If(
        q.Exists(q.Var("match")),
        q.Let(
          {
            ref: q.Select("ref", q.Get(q.Var("match"))),
            hits: q.ToInteger(q.Select("hits", q.Select("data", q.Get(q.Var("match"))))),
          },
          q.Update(q.Var("ref"), {
            data: {
              hits: q.Add(q.Var("hits"), 1),
            },
          })
        ),
        q.Create(q.Collection("hits"), {
          data: {
            slug: slug,
            hits: 1,
          },
        })
      )
    )
  );

  client.close();

  const hits = result.data.hits;

  // send client the new hit count
  return {
    statusCode: 200,
    headers: {
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
      Expires: "0",
      Pragma: "no-cache",
    },
    body: JSON.stringify({
      slug: slug,
      hits: hits,
      pretty_hits: numeral(hits).format("0,0"),
      pretty_unit: pluralize("hit", hits),
    }),
  };
};
