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
router.get("/products", (req, res) => {
  res.status(200).render("pages/products", {
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

router.get("/payment", (req, res) => {
  res.status(200).render("pages/payment", {
    title: "Payment",
  });
});

//Error Pages
router.get("*", (req, res) => {
  res.status(404).render("pages/404", {
    title: "404",
  });
});

module.exports = router;
