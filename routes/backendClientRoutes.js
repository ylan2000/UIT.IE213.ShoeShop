const backendClientController = require("../controllers/backendClientController");
const express = require("express");
const router = express.Router();

router.get("/add-to-cart/:id", backendClientController.addToCart);
router.delete("/remove-from-cart/:id", backendClientController.removeFromCart);
router.patch("/update-cart/:id", backendClientController.updateCart);

module.exports = router;