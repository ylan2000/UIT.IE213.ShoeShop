const dotenv = require("dotenv");
const app = require("../app");
const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const key = require("./config/key");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: false}));

const connect = mongoose.connect(key.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
}); // start the server

