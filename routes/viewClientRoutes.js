const express = require("express");
const clientController = require("../controllers/clientController");
const router = express.Router();
const {user} = require("../models/userModel");
const {ensureAuthenicated} = require('../public/js/authentication');

// --- public routes
router.get("/", clientController.getHome);

router.get("/home", clientController.getHome);

router.get("/products/searchProducts", clientController.searchProducts);

router.get("/products/sortProducts", clientController.sortProducts);

//lấy cái brand cho thanh navbar
router.get("/products/:brand?", clientController.getProducts);

//là để lấy detail theo slug
router.get("/product/:slug", clientController.getProduct);

router.get("/return-policy", clientController.getPolicy);

router.get("/feedback", clientController.getFeedback);

router.get("/clientOrder", clientController.getOrder);

// --- protected routes
router.get("/about", clientController.getAbout);

router.get("/orders", (req, res) => {
  return res.status(200).render("pages/orders", {
    title: "Orders",
  });
});

router.get("/order-detail", (req, res) => {
  return res.status(200).render("pages/order-detail", {
    title: "Order Detail",
  });
});

//users
router.get("/account" ,ensureAuthenicated , clientController.getAccount); // dung authenicate

router.get("/wishlist", clientController.getWishlist); 

//Check out
router.get("/cart", clientController.getCart);

router.get("/checkout", clientController.getPayment);

// Sign in
router.get("/signInFirst", clientController.getLoginFirst);

router.get("/permissiondenied", clientController.getPermissionDenied);

router.get("/signIn", clientController.getSignIn);

router.get("/signUp", clientController.getSignUp);

router.get("/logout", clientController.logout);
//Error Pages
router.get("*", clientController.get404);




module.exports = router;
