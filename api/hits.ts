"use strict";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { Client, query as q } from "faunadb";
import numeral from "numeral";
import pluralize from "pluralize";
import dotenv from "dotenv";

dotenv.config();

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { slug } = req.query;

  try {
    // some rudimentary error handling
    if (!process.env.FAUNADB_SERVER_SECRET) {
      throw new Error("Database credentials aren't set.");
    }
    if (req.method !== "GET") {
      throw new Error(`Method ${req.method} not allowed.`);
    }
    if (!slug || slug === "/") {
      throw new Error("Parameter `slug` is required.");
    }

    const client = new Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });

    // refer to snippet below for the `hit` function defined in the Fauna cloud
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await client.query<any>(q.Call(q.Function("hit"), slug));

    // send client the new hit count
    res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.setHeader("Expires", 0);
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.json({
      slug: result.data.slug,
      hits: result.data.hits,
      pretty_hits: numeral(result.data.hits).format("0,0"),
      pretty_unit: pluralize("hit", result.data.hits),
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({ message: error.message });
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
