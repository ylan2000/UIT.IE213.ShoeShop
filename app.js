var express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); //Để lấy thông tin từ body web
const methodOverride = require("method-override"); //Sử dụng PUT, Delete,...

const adminRouter = require("./routes/viewAdminRoutes");
const clientRouter = require("./routes/viewClientRoutes");

var app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

app.use(methodOverride('_method'));


//~~~~~~ROUTING~~~~~~~
app.use("/admin", adminRouter);
app.use("/", clientRouter);

module.exports = app;
