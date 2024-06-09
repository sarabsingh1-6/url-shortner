const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
  console.log("MongoDB connected");
});

app.set("view engine", "ejs"); //here telling that going to use ejs engine
app.set("views", path.resolve("./views")); // here telling that all the view files are in the view folder path

app.use(express.json()); //middleware
app.use(express.urlencoded({extended:false})) // to support form data 

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

app.use("/url", urlRoute); // anything use with "url" use urlRoute

app.use("/", staticRoute); // anything start with / use staticRoute

// app.get("url/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate(
//     {
//       shortId, // here finding with short id
//     },
//     {
//       $push: {
//         visitHistory: {
//           timestamp: Date.now(),
//         },
//         // pushing new date in visit array
//       },
//     }
//   );
//   res.redirect(entry.redirectURL);
// });

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));
