const mongoose = require("mongoose");

//Creating a schema here
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true, //to create unique id for all users
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true } // saving the time to check the entry time
);

//creating model here 
const URL = mongoose.model("url", urlSchema);

module.exports = URL;
