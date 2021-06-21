const backendClientController = require("../controllers/backendClientController");
const express = require("express");
const router = express.Router();

router
  .route("/cart/:id")
  .post(backendClientController.addToCart)
  .delete(backendClientController.removeFromCart)
  .patch(backendClientController.updateCart);

router
  .route("/wishlist/:id")
  .post(backendClientController.addToWishlist)
  .delete(backendClientController.removeFromWishlist)

router
  .route("/register")
  .post(backendClientController.register)

router
  .route("/login")
  .post(backendClientController.login)

router
  .route("/payment/")
  .post(backendClientController.postPaymentDone)
  .delete(backendClientController.removeCart)
module.exports = router;