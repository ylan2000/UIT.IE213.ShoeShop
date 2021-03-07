var express = require("express");
const path = require("path");

var app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.status(200).render("pages/home");
});

module.exports = app;
