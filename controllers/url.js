const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body; // getting the url here from user
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  //creating a new url in our DB
  await URL.create({
    shortId: shortID, // shortID generated above
    redirectURL: body.url, //url entered by user
    visitHistory: [],
  });
  // generated url id
  // return res.json({ id: shortID });

  //rendering homepage and sending ID also
  return res.render("home", {
    id: shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
