"use strict";

const faunadb = require("faunadb"),
  q = faunadb.query;
const numeral = require("numeral");
const pluralize = require("pluralize");
const rssParser = require("rss-parser");
require("dotenv").config();

const baseUrl = "https://jarv.is/";

module.exports = async (req, res) => {
  try {
    // some rudimentary error handling
    if (!process.env.FAUNADB_SERVER_SECRET) {
      throw new Error("Database credentials aren't set.");
    }
    if (req.method !== "GET") {
      throw new Error(`Method ${req.method} not allowed.`);
    }

    const parser = new rssParser({
      timeout: 3000,
    });
    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    // get database and RSS results asynchronously
    const [feed, result] = await Promise.all([
      parser.parseURL(baseUrl + "feed.xml"),
      client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection("hits"))),
          q.Lambda((x) => q.Select("data", q.Get(x)))
        )
      ),
    ]);

    let stats = {
      total: {
        hits: 0,
      },
      pages: result.data,
    };

    stats.pages.map((p) => {
      // match URLs from RSS feed with db to populate some metadata
      let match = feed.items.find((x) => x.link === baseUrl + p.slug + "/");
      if (match) {
        p.title = match.title;
        p.url = match.link;
        p.date = match.isoDate;
        delete p.slug;
      }

      // it's easier to add comma-separated numbers and proper pluralization here on the backend
      p.pretty_hits = numeral(p.hits).format("0,0");
      p.pretty_unit = pluralize("hit", p.hits);

      // add these hits to running tally
      stats.total.hits += p.hits;

      return p;
    });

    // sort by hits (descending)
    stats.pages.sort((a, b) => {
      return a.hits > b.hits ? -1 : 1;
    });

    // do same prettification as above to totals
    stats.total.pretty_hits = numeral(stats.total.hits).format("0,0");
    stats.total.pretty_unit = pluralize("hit", stats.total.hits);

    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.json(stats);
  } catch (error) {
    console.error(error);

    return res.status(400).json({ message: error.message });
  }
};
