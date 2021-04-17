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
router.use("/edit-product", adminController.getEditProduct);

// users
router.use("/users", adminController.getUsers);
router.use("/add-user", adminController.getUsers);

// feedbacks
router.use("/feedbacks", adminController.getFeedbacks);

module.exports = router;
