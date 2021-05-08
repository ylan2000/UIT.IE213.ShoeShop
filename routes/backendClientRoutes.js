const backendClientController = require("../controllers/backendClientController");
const express = require("express");
const router = express.Router();

router.get("/add-to-cart/:id", backendClientController.addToCart);

module.exports = router;