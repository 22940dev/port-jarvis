"use strict";

const faunadb = require("faunadb"),
  q = faunadb.query;
const numeral = require("numeral");
const pluralize = require("pluralize");
require("dotenv").config();

exports.handler = async () => {
  try {
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    const result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("hits"))),
        q.Lambda((x) => q.Select("data", q.Get(x)))
      )
    );

    const posts = result.data.sort((a, b) => {
      return a.hits > b.hits ? -1 : 1;
    });

    posts.forEach((p) => {
      p.pretty_hits = numeral(p.hits).format("0,0");
      p.pretty_unit = pluralize("hit", p.hits);
      p.url = "https://jarv.is/" + p.slug + "/";
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(posts),
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
