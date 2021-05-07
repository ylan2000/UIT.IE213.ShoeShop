const adminController = require("../controllers/adminController");
const express = require("express");
const router = express.Router();

//~~~~~~~~PRODUCT~~~~~~~~
//Add -> POST
router.post("/product/add",adminController.postAddProduct);
//Update -> PUT
router.put("/product/edit/:id",adminController.putUpdateProduct);

//~~~~~~~~USER~~~~~~~~~~~~
module.exports = router;