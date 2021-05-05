const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/", adminController.getDashboard);

router.get("/dashboard", adminController.getDashboard);

// categories
router.get("/categories", adminController.getCategories);

// orders
router.get("/orders", adminController.getOrders);

// products
router.use("/products", adminController.getProducts);
router.use("/add-product", adminController.getAddProduct);
router.use("/edit-product/:id", adminController.getEditProduct);

// users
router.use("/users", adminController.getUsers);
router.use("/add-user", adminController.getAddUser);

// feedbacks
router.use("/feedbacks", adminController.getFeedbacks);

//delete
router.delete("/product/delete/:id", adminController.delete); 

module.exports = router;
