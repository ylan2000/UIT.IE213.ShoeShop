const {Product} = require("../models/productModel")
const {Category} = require("../models/categoryModel")
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getDashboard = catchAsync(async (req, res, next) => {
  return res.status(200).render("admin/pages/dashboard", {
    title: "Dashboard",
  });
});

// categories
exports.getCategories = catchAsync(async (req, res, next) => {
  return res.status(200).render("admin/pages/category/category", {
    title: "Categories",
  });
});

// orders
exports.getOrders = catchAsync(async (req, res, next) => {
  return res.status(200).render("admin/pages/order/order", {
    title: "Orders",
  });
});

// products
exports.getProducts = catchAsync(async (req, res, next) => {
  const status = req.query.status
  const products =  await Product.find();
  
  return res.status(200).render("admin/pages/product/product", {
    title: "Products", product: products, status: status
  });
});

exports.getAddProduct = catchAsync(async (req, res, next) => {
  const category = await Category.find();

  return res.status(200).render("admin/pages/product/product-add", {
    title: "Add Product",
    category: category,
    searchOptions: req.query,
  });
});

exports.getEditProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  const category = await Category.find();

  return res.status(200).render("admin/pages/product/product-edit", {
    title: "Edit Product",
    product: product,
    category: category
  });
});

// users
exports.getUsers = catchAsync(async (req, res, next) => {
  return res.status(200).render("admin/pages/user/user", {
    title: "Users",
  });
});

exports.getAddUser = catchAsync(async (req, res, next) => {
  return res.status(200).render("admin/pages/user/user-add", {
    title: "Add User",
  });
});

// Feedbacks
exports.getFeedbacks = catchAsync(async (req, res, next) => {
  return res.status(200).render("admin/pages/feedback", {
    title: "Add User",
  });
});

//Product POST
//add
exports.postAddProduct = catchAsync(async (req,res,next) => {
  const product = new Product({
    name: req.body.productName,
    description: req.body.productShortDesc,
    detail: req.body.productDesc,
    price: req.body.productPrice,
    category: [req.body.productCate],
    sale: req.body.pSaleOff,
    condition: req.body.pIsNew,
    quantity: req.body.quantity,
  });
  saveImage(product, req.body.productImg);

  const newProduct = await product.save();
  return res.redirect("/admin/products?status=Success");
});

//Update
exports.putUpdateProduct = catchAsync(async(req,res,next) => {
  let product;
  product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that name!', 404));
  }

  product.name = req.body.productName;
  product.description = req.body.productShortDesc;
  product.detail = req.body.productDesc;
  product.category = [req.body.productCate];
  product.sale = req.body.pSaleOff;
  product.condition = req.body.pIsNew;
  product.quantity = req.body.quantity;
  product.price = req.body.productPrice;
  
  const image = new Product()
  saveImage(image, req.body.productImg)
  
  product.image = image.image;
  
  await product.save();
  
  return res.redirect("/admin/products?status=Success");
});

function saveImage(product, coverEncoded) {
  if (coverEncoded == null) return;
  const image = JSON.parse(coverEncoded);
  if (image != null && imageMimeTypes.includes(image.type)) {
    product.coverImage.data = new Buffer.from(image.data,'base64');
    product.coverImage.type = image.type;
  }
}
//Admin delete

exports.delete = factory.deleteOne(Product);