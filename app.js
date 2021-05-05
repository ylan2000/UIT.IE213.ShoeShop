var express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); 
const methodOverride = require("method-override"); 

const adminRouter = require("./routes/viewAdminRoutes");
const clientRouter = require("./routes/viewClientRoutes");
const backendAdminRouter = require("./routes/backendAdminRoutes")

var app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

app.use(methodOverride('_method'));


//~~~~~~ROUTING~~~~~~~

//view
app.use("/admin", adminRouter);
app.use("/", clientRouter);

//backend
app.use("/admin/api", backendAdminRouter);

module.exports = app;
