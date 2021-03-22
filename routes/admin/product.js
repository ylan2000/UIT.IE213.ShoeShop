const { Product } = require("../../model/Product");
const express = require("express");
const { render } = require("ejs");
const router = express.Router();
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

//Get
//Index
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).render("admin/pages/product/product", {
    title: "Products",
    products: products,
    searchOptions: req.query,
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

//Test
router.get("/image", async (req, res) => {
  const product = await Product.find();
  res.render("admin/pages/product/product-add", {
    product: product,
    searchOptions: req.query,
  });
  //for ejs
  /* <div>
              <% product.forEach(product => { %>
                <img height="100" width="100" src="<%= product.imagePath %>">
              <% }) %>
            </div>*/
});

//Post
router.post("/insertData", async (req, res) => {
  const product = new Product({
    Name: req.body.productName,
    Description: req.body.productShortDesc,
    Detail: req.body.productDesc,
    Price: req.body.productPrice,
    Brand: req.body.productCate,
    Sale: req.body.pSaleOff,
    Condition: req.body.pIsNew,
    Quantity: req.body.quantity,
  });
  saveImage(product, req.body.productImg);
  try {
    const newProduct = await product.save();
    res.redirect("/admin/product");
  } catch (error) {
    res.send("error");
  }
});

function saveImage(product, coverEncoded) {
  if (coverEncoded == null) return;
  const image = JSON.parse(coverEncoded);
  if (image != null && imageMimeTypes.includes(image.type)) {
    product.Image = new Buffer.from(image.data, "base64");
    product.ImageType = image.type;
  }
}

module.exports = router;
