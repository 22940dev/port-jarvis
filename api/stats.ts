"use strict";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { Client, query as q } from "faunadb";
import numeral from "numeral";
import pluralize from "pluralize";
import rssParser from "rss-parser";

const baseUrl = "https://jarv.is/";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (req: VercelRequest, res: VercelResponse) => {
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
    const client = new Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    // get database and RSS results asynchronously
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [feed, result] = await Promise.all<{ [key: string]: any }, any>([
      parser.parseURL(baseUrl + "feed.xml"),
      client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection("hits"))),
          q.Lambda((x) => q.Select("data", q.Get(x)))
        )
      ),
    ]);

    type SiteStats = {
      hits: number;
      pretty_hits?: string;
      pretty_unit?: string;
    };
    type PageStats = {
      title: string;
      url: string;
      date: string;
      slug?: string;
      hits: number;
      pretty_hits: string;
      pretty_unit: string;
    };
    type OverallStats = {
      total: SiteStats;
      pages: Array<PageStats>;
    };

    const pages: Array<PageStats> = result.data;
    const stats: OverallStats = {
      total: { hits: 0 },
      pages,
    };

    pages.map((p: PageStats) => {
      // match URLs from RSS feed with db to populate some metadata
      const match = feed.items.find((x: { link: string }) => x.link === baseUrl + p.slug + "/");
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
    stats.pages.sort((a: { hits: number }, b: { hits: number }) => {
      return a.hits > b.hits ? -1 : 1;
    });

    // do same prettification as above to totals
    stats.total.pretty_hits = numeral(stats.total.hits).format("0,0");
    stats.total.pretty_unit = pluralize("hit", stats.total.hits);

    // let Vercel edge cache results for 15 mins
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.json(stats);
  } catch (error) {
    console.error(error);

    res.status(400).json({ message: error.message });
  }
};
