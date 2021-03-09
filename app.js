var express = require("express");
const path = require("path");

var app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));

//~~~~~~ROUTING~~~~~~~
//Landing Pages
app.get("/", (req, res) => {
  res.status(200).render("pages/home");
});

app.get("/home", (req, res) => {
  res.status(200).render("pages/home");
});

app.get("/about", (req,res) =>
{
  res.status(200).render("pages/about");
})

//Products
app.get("/products", (req,res) =>
{
  res.sendFile(__dirname + '/views/admin/pages/product/product.html');
})

app.get("/converse", (req,res) =>
{
  res.status(200).render("pages/converse");
})

app.get("/palladium", (req,res) =>
{
  res.status(200).render("pages/palladium");
})

app.get("/vans", (req,res) =>
{
  res.status(200).render("pages/vans");
})

app.get("/detail/show", (req,res) =>
{
  res.status(200).render("pages/detail");
})

app.get("/return-policy", (req,res) =>
{
  res.status(200).render("pages/return-policy");
})

app.get("/order-detail", (req,res) =>
{
  res.status(200).render("pages/order-detail");
})

//users
app.get("/login/logout", (req,res) =>
{
  res.status(200).render("pages/home");
})

app.get("/account", (req,res) =>
{
  res.status(200).render("pages/account");
})

app.get("/wishlist", (req,res) =>
{
  res.status(200).render("pages/wishlist");
})

//Check out
app.get("/cart", (req,res) =>
{
  res.status(200).render("pages/cart");
})

app.get("/orders", (req,res) =>
{
  res.status(200).render("pages/orders");
})

//Error Pages
app.get("/404" ,(req, res) => 
{
  res.status(404).render("pages/404");
});

module.exports = app;
