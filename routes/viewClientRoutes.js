const express = require("express");
const clientController = require("../controllers/clientController");
const router = express.Router();
const {user} = require("../models/userModel");
const {ensureAuthenicated} = require('../public/js/authentication');

// --- public routes
router.get("/", clientController.getHome);

router.get("/home", clientController.getHome);

router.get("/products", clientController.getProducts);

router.get("/products/searchProducts", clientController.searchProducts);

router.get("/vans", clientController.getVans);

router.get("/palladium", clientController.getPalladium);

router.get("/converse", clientController.getConverse);

router.get("/product/:slug", clientController.getProduct);

router.get("/return-policy", clientController.getPolicy);

// --- protected routes
router.get("/about", clientController.getAbout);

router.get("/orders", (req, res) => {
  res.status(200).render("pages/orders", {
    title: "Orders",
  });
});

router.get("/order-detail", (req, res) => {
  res.status(200).render("pages/order-detail", {
    title: "Order Detail",
  });
});

//users
router.get("/account" ,ensureAuthenicated , clientController.getAccount); // dung authenicate

router.get("/wishlist", clientController.getWishlist); 

//Check out
router.get("/cart", clientController.getCart);

router.post("/api/payment",clientController.postCheckout);

router.get("/payment", clientController.postCheckout);

router.post("/api/paymentDone",clientController.postPaymentDone);

router.post("/api/paymentSuccess", (req,res) => {return res.send(req.body)})

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
