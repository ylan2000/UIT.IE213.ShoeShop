const { Router } = require('express');
const { mongo } = require('mongoose');
const {Product} = require('../models/productModel')
exports.getDashboard = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("admin/pages/dashboard", {
      title: "Dashboard",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// categories
exports.getCategories = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("admin/pages/category/category", {
      title: "Categories",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// orders
exports.getOrders = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("admin/pages/order/order", {
      title: "Orders",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// products
exports.getProducts = async (req, res, next) => {
  try {
    // Render template
    const status = req.query.status
    const products =  await Product.find();
    res.status(200).render("admin/pages/product/product", {
      title: "Products", product: products, status: status
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAddProduct = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("admin/pages/product/product-add", {
      title: "Add Product",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getEditProduct = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("admin/pages/product/product-edit", {
      title: "Edit Product",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// users
exports.getUsers = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("admin/pages/user/user", {
      title: "Users",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAddUser = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("admin/pages/user/user-add", {
      title: "Add User",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// Feedbacks
exports.getFeedbacks = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("admin/pages/feedback", {
      title: "Add User",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

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


