var express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); //Để lấy thông tin từ body web
const methodOverride = require("method-override"); //Sử dụng PUT, Delete,...
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
// -- Call passport
require('./public/js/passport')(passport);

// -- Route
const adminRouter = require("./routes/viewAdminRoutes");
const clientRouter = require("./routes/viewClientRoutes");
const backendAdminRouter = require("./routes/backendAdminRoutes");
const backendClientRouter = require("./routes/backendClientRoutes");
const clientController = require("./controllers/clientController");

var app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

app.use(bodyParser.json())

app.use(methodOverride('_method'));

app.use(session({
  secret: 'gBpwmwE0PmyDKPuLhhmY8CONJQW3TnCujQuoE8nVao',
  resave: false,
  saveUninitialized: true
}
));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// Sử dụng flash
//  -- Kết nối đến flash
app.use(flash())
//  -- Tạo global variable với flash
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});



//~~~~~~ROUTING~~~~~~~

//backend
app.use("/admin/api", backendAdminRouter);
app.use("/client/api", backendClientRouter);

//view
app.use("/admin", adminRouter);
app.use("/" ,clientRouter);

app.all("*", clientController.get404);

module.exports = app;
