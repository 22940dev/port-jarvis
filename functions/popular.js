"use strict";

const faunadb = require("faunadb"),
  q = faunadb.query;
const numeral = require("numeral");
const pluralize = require("pluralize");
const rssParser = require("rss-parser");
require("dotenv").config();

exports.handler = async () => {
  try {
    const parser = new rssParser({
      timeout: 3000,
    });
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    const feed = await parser.parseURL("https://jarv.is/feed.xml");
    const result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("hits"))),
        q.Lambda((x) => q.Select("data", q.Get(x)))
      )
    );

    let posts = result.data;

    posts.map((p) => {
      // match URLs from RSS feed with db to populate some metadata
      let match = feed.items.find((x) => x.link === "https://jarv.is/" + p.slug + "/");
      if (match) {
        p.title = match.title;
        p.url = match.link;
        p.date = match.isoDate;
      }

      // add comma-separated numbers and proper pluralization on the backend
      p.pretty_hits = numeral(p.hits).format("0,0");
      p.pretty_unit = pluralize("hit", p.hits);

      return p;
    });

    // sort by hits (descending)
    posts.sort((a, b) => {
      return a.hits > b.hits ? -1 : 1;
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
