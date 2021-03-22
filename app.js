var express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const clientRouter = require("./routes/client");

var app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

//~~~~~~ROUTING~~~~~~~
app.use("/admin", adminRouter);
app.use("/", clientRouter);

module.exports = app;
