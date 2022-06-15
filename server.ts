// ToDo
// [x] - get top 3 post in past 24hrs from r/animemes
// [x] - check if post is posted
// [x] - if not poseted then post @taewonsu
// [x] - add post to posted_list

// https://www.reddit.com/r/Animemes/top.json?limit=3 - {url, id, title, author}
import { config } from "dotenv";

import express from "express";
import { reddit2insta } from "./reddit2insta";

config();

const app = express();
const port = process.env.PORT || 5000;

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    available_endpoints: "GET /showtime",
  });
});

app.get("/showtime", async (req, res) => {
  const top_x = req.body.top_x;
  const msg = await reddit2insta(
    process.env.IG_USERNAME,
    process.env.IG_PASSWORD,
    process.env.R_SUB,
    top_x
  );
  res.json({
    status: msg ? msg : "SUCCESS",
  });
});

app.listen(port, () => console.log(`🚀 @ http://localhost:${port}`));