var express = require("express");
const path = require("path");

var app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));

//~~~~~~ROUTING~~~~~~~
//Admin
app.get("/admin/category", (req, res) => {
  res.status(200).render("admin/pages/category/category", {
    title: "Category",
  });
});

app.get("/admin/order", (req, res) => {
  res.status(200).render("admin/pages/order/order", {
    title: "Order",
  });
});

app.get("/products", (req, res) => {
  res.status(200).render("admin/pages/product/product", {
    title: "Products",
  });
});

app.get("/admin/product-add", (req, res) => {
  res.status(200).render("admin/pages/product/product-add", {
    title: "Add Product",
  });
});

app.get("/admin/product-edit", (req, res) => {
  res.status(200).render("admin/pages/product/product-edit", {
    title: "Edit Product",
  });
});

app.get("/admin/user-add", (req, res) => {
  res.status(200).render("admin/pages/user/user-add", {
    title: "Add User",
  });
});

app.get("/admin/user", (req, res) => {
  res.status(200).render("admin/pages/user/user", {
    title: "Users",
  });
});

app.get("/admin/dashboard", (req, res) => {
  res.status(200).render("admin/pages/dashboard", {
    title: "Dashboard",
  });
});

app.get("/admin", (req, res) => {
  res.status(200).render("admin/pages/dashboard", {
    title: "Dashboard",
  });
});

//Landing Pages
app.get("/", (req, res) => {
  res.status(200).render("pages/home", { title: "Home" });
});

app.get("/home", (req, res) => {
  res.status(200).render("pages/home", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.status(200).render("pages/about", { title: "About" });
});

//Products
app.get("/converse", (req, res) => {
  res.status(200).render("pages/converse", {
    title: "Converse",
  });
});

app.get("/palladium", (req, res) => {
  res.status(200).render("pages/palladium", {
    title: "Palladium",
  });
});

app.get("/vans", (req, res) => {
  res.status(200).render("pages/vans", {
    title: "Vans",
  });
});

app.get("/detail", (req, res) => {
  res.status(200).render("pages/detail", {
    title: "Detail",
  });
});

app.get("/return-policy", (req, res) => {
  res.status(200).render("pages/return-policy", {
    title: "Policy",
  });
});

app.get("/order-detail", (req, res) => {
  res.status(200).render("pages/order-detail", {
    title: "Order Detail",
  });
});

//users
app.get("/account", (req, res) => {
  res.status(200).render("pages/account", {
    title: "Account",
  });
});

app.get("/wishlist", (req, res) => {
  res.status(200).render("pages/wishlist", {
    title: "Wishlist",
  });
});

//Check out
app.get("/cart", (req, res) => {
  res.status(200).render("pages/cart", {
    title: "Cart",
  });
});

app.get("/orders", (req, res) => {
  res.status(200).render("pages/orders", {
    title: "Orders",
  });
});

//Error Pages
app.get("/404", (req, res) => {
  res.status(404).render("pages/404", {
    title: "404",
  });
});

module.exports = app;
