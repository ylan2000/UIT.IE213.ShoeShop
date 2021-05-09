const backendClientController = require("../controllers/backendClientController");
const express = require("express");
const router = express.Router();

router
  .route("/cart/:id")
  .post(backendClientController.addToCart)
  .delete(backendClientController.removeFromCart)
  .patch(backendClientController.updateCart);

module.exports = router;