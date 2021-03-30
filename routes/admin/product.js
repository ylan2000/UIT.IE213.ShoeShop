const express = require("express");
const router = express.Router();

//Index
router.get("/", async (req, res) => {
  res.status(200).render("admin/pages/product/product", {
    title: "Products",
  });
});

//Add
router.get("/add", (req, res) => {
  res.status(200).render("admin/pages/product/product-add", {
    title: "Add Product",
  });
});

//Edit
router.get("/edit", (req, res) => {
  res.status(200).render("admin/pages/product/product-edit", {
    title: "Edit Product",
  });
});

module.exports = router;
