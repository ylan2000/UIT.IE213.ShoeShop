const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("pages/home", { title: "Home" });
});

router.get("/home", (req, res) => {
  res.status(200).render("pages/home", { title: "Home" });
});

router.get("/about", (req, res) => {
  res.status(200).render("pages/about", { title: "About" });
});

//Products
router.get("/converse", (req, res) => {
  res.status(200).render("pages/converse", {
    title: "Converse",
  });
});

router.get("/palladium", (req, res) => {
  res.status(200).render("pages/palladium", {
    title: "Palladium",
  });
});

router.get("/vans", (req, res) => {
  res.status(200).render("pages/vans", {
    title: "Vans",
  });
});

router.get("/detail", (req, res) => {
  res.status(200).render("pages/detail", {
    title: "Detail",
  });
});

router.get("/return-policy", (req, res) => {
  res.status(200).render("pages/return-policy", {
    title: "Policy",
  });
});

router.get("/order-detail", (req, res) => {
  res.status(200).render("pages/order-detail", {
    title: "Order Detail",
  });
});

//users
router.get("/account", (req, res) => {
  res.status(200).render("pages/account", {
    title: "Account",
  });
});

router.get("/wishlist", (req, res) => {
  res.status(200).render("pages/wishlist", {
    title: "Wishlist",
  });
});

//Check out
router.get("/cart", (req, res) => {
  res.status(200).render("pages/cart", {
    title: "Cart",
  });
});

router.get("/orders", (req, res) => {
  res.status(200).render("pages/orders", {
    title: "Orders",
  });
});

//Error Pages
router.get("*", (req, res) => {
  res.status(404).render("pages/404", {
    title: "404",
  });
});

module.exports = router;
