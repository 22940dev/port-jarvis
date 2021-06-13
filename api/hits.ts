/// <reference types="./types/hits" />

import * as Sentry from "@sentry/node";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Client, query as q } from "faunadb";
import numeral from "numeral";
import pluralize from "pluralize";
import rssParser from "rss-parser";

const baseUrl = "https://jarv.is/";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV || process.env.SENTRY_ENVIRONMENT || "",
  tracesSampleRate: 1.0,
});

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

    const client = new Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });
    const { slug } = req.query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;

    if (!slug || slug === "/") {
      // return overall site stats if slug not specified
      result = await getSiteStats(client);

      // let Vercel edge and browser cache results for 15 mins
      res.setHeader("Cache-Control", "public, max-age=900, s-maxage=900, stale-while-revalidate");
    } else {
      // increment this page's hits
      result = await incrementPageHits(slug, client);

      // disable caching on both ends
      res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.setHeader("Expires", 0);
      res.setHeader("Pragma", "no-cache");
    }

    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    await Sentry.flush(2000);

    res.status(400).json({ message: error.message });
  }
};

const incrementPageHits = async (slug: string | string[], client: Client) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await client.query<any>(
    q.Let(
      { match: q.Match(q.Index("hits_by_slug"), slug) },
      q.If(
        q.Exists(q.Var("match")),
        q.Let(
          {
            ref: q.Select("ref", q.Get(q.Var("match"))),
            hits: q.ToInteger(q.Select("hits", q.Select("data", q.Get(q.Var("match"))))),
          },
          q.Update(q.Var("ref"), { data: { hits: q.Add(q.Var("hits"), 1) } })
        ),
        q.Create(q.Collection("hits"), { data: { slug: slug, hits: 1 } })
      )
    )
  );

  // add formatted hits with comma and pluralized "hit(s)", simpler to do here than in browser
  const hits: PageStats = {
    ...result.data,
    pretty_hits: numeral(result.data.hits).format("0,0"),
    pretty_unit: pluralize("hit", result.data.hits),
  };

  // send client the *new* hit count
  return hits;
};

const getSiteStats = async (client: Client) => {
  const parser = new rssParser({
    timeout: 3000,
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

  const pages: PageStats[] = result.data;
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

  return stats;
};
