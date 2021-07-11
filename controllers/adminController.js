const {Product} = require("../models/productModel")
const {Category} = require("../models/categoryModel")
const {Transaction} = require("../models/transactionModel")
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

const { Router } = require('express');
const { mongo } = require('mongoose');
exports.getDashboard = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/dashboard", {
      title: "Dashboard",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// categories
exports.getCategories = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/category/category", {
      title: "Categories",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// orders
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Transaction.find();
    const shipped = [];
    const shipping = [];
    for(i =0; i < orders.length; i++){
      if(orders[i].status == true ){
        shipped.push(orders[i])
      }
      if(orders[i].status == false){
        shipping.push(orders[i])
      }
    }
    // Render template
    return res.status(200).render("admin/pages/order/order", {
      title: "Orders", 
      orders: orders,
      shipped: shipped,
      shipping: shipping
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// products
exports.getProducts = async (req, res, next) => {
  try {
    // Render template
    const status = req.query.status;
    const products =  await Product.find();
    const sales = [];
    const isNew = [];
    for(i =0; i < products.length; i++){
      if(products[i].sale > 0){
        sales.push(products[i])
      }
      if(products[i].condition == true){
        isNew.push(products[i])
      }
    }
    return res.status(200).render("admin/pages/product/product", {
      title: "Products", 
      product: products, 
      status: status,
      sales: sales,
      isNew: isNew
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAddProduct = async (req, res, next) => {
  try {
    const category = await Category.find();
    // Render template
    return res.status(200).render("admin/pages/product/product-add", {
      title: "Add Product",
      category: category,
      searchOptions: req.query,
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getEditProduct = async (req, res, next) => {
  try {
    //get product for edit
    const product = await Product.findById(req.params.id);
    const category = await Category.find();
    // Render template
    return res.status(200).render("admin/pages/product/product-edit", {
      title: "Edit Product",
      product: product,
      category: category
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// users
exports.getUsers = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/user/user", {
      title: "Users",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAddUser = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/user/user-add", {
      title: "Add User",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// Feedbacks
exports.getFeedbacks = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("admin/pages/feedback", {
      title: "Add User",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

//Product POST
//add
exports.postAddProduct = async (req,res,next) => {
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
  try {
    const newProduct = await product.save();
    return res.redirect("/admin/products?status=Success");
  } catch (err) {
    return res.redirect("/admin/products?status=Fail")
  }

  next();
}

//Update
exports.putUpdateProduct = async(req,res,next) => {
  let product

  try {
    product = await Product.findById(req.params.id);
    product.name = req.body.productName,
    product.description = req.body.productShortDesc;
    product.detail = req.body.productDesc;
    product.category = [req.body.productCate];
    product.sale = req.body.pSaleOff;
    product.condition = req.body.pIsNew;
    product.quantity = req.body.quantity;
    product.price = req.body.productPrice;
    const image = new Product()
    saveImage(image,req.body.productImg)
    product.image = image.image;
    await product.save()
    return res.redirect("/admin/products?status=Success");
  } catch (err) {
    return res.redirect("/admin/products?status=Fail")
  }
}

function saveImage(product, coverEncoded) {
  if (coverEncoded == null) return;
  const image = JSON.parse(coverEncoded);
  if (image != null && imageMimeTypes.includes(image.type)) {
    product.coverImage.data = new Buffer.from(image.data,'base64');
    product.coverImage.type = image.type;
  }
}
//Admin delete

exports.delete = async (req, res) => {
  let product
  try {
    product = await Product.findById(req.params.id);
    await product.remove();
    return res.redirect("/admin/products?status=Success");
  } catch {
    return res.redirect("/admin/products?status=Fail");
  }
};

exports.deleteOrder = async (req,res) => {
  let order
  try {
    order = await Transaction.findById(req.params.id);
    await order.remove();
    return res.send("success");
  } catch (error) {
    return res.send(error);
  }
}

