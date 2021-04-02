const dotenv = require("dotenv");
const app = require("./app");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));



app.listen(port, () => {
  console.log(`App running on port ${port}`);
}); // start the server
