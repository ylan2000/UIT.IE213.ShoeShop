const dotenv = require("dotenv");
const app = require("../app");
const express = require ("express");
const mongoose = require("mongoose");
const key = require("./config/key");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;

const connect = mongoose.connect(key.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
}); // start the server
