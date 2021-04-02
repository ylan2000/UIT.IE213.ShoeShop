const { Product } = require("../../models/productModel");
const express = require("express");
const { render } = require("ejs");
const router = express.Router();
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

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
router.get("/:id/edit", async (req,res) =>{
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).render("admin/pages/product/product-edit", {
      title: "Edit Product",
      product: product
    });
  } catch (error) {
    
  }
})

router.put("/:id", async (req,res) =>{
  let product

  try {
    product = await Product.findById(req.params.id);
    product.description = req.body.productShortDesc;
    product.price = req.body.productPrice;
    const image = new Product()
    saveImage(image,req.body.productImg)
    product.image = image.image;
    await product.save()
    res.redirect("/admin/product");
  } catch (error) {
    if (product==null) res.send("can't find product");
    else res.send("error");
  }
});

//Post
router.post("/insertData", async (req, res) => {
  const product = new Product({
    name: req.body.productName,
    description: req.body.productShortDesc,
    detail: req.body.productDesc,
    price: req.body.productPrice,
    brand: req.body.productCate,
    sale: req.body.pSaleOff,
    condition: req.body.pIsNew,
    quantity: req.body.quantity,
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
    product.image.data = new Buffer.from(image.data,'base64');
    product.image.type = image.type;
  }
}


module.exports = router;
