const dotenv = require("dotenv");
const app = require("../app");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;
const config = require("./config/key");

const connect = mongoose.connect(config.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
}); // start the server
