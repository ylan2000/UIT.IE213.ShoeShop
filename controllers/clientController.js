const {Product} = require('../models/productModel');
const Cart = require("../models/cartModel");
const Wishlist = require("../models/wishlistModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY


const {Category} = require("../models/categoryModel");
exports.getHome = async (req, res, next) => {
  try {
    // Render template
    const products = await (await Product.find().sort({createdDate: -1})).slice(0, 8);
    return res.status(200).render("pages/home", { title: "Home", product: products});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAbout = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/about", { title: "About" });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getProducts = async (req, res, next) => {
  try {
    // Render template
    const products = await (await Product.find()).slice(0, 8);
    return res.status(200).render("pages/products", {
      title: "Products", product: products
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getVans = async (req, res, next) => {
  try {
    const product = await Product.find({"category.0.name" : "Vans"});
    // Render template
    res.status(200).render("pages/products", {
      title: "Vans",
      products: product,

    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getPalladium = async (req, res, next) => {
  try {
    const product = await Product.find({"category.0.name" : "Palladium"});
      // Render template
      res.status(200).render("pages/products", {
        title: "Palladium",
        products: product,
      });
    } 
    catch (err) {
      res.status(404).json({ status: "fail", message: err });}

  next();
};

exports.getConverse = async (req, res, next) => {
  try {
    const product = await Product.find({"category.0.name" : "Converse"});
         // Render template
        res.status(200).render("pages/products", {
        title: "Converse",
        products: product,
    });
    
  } 
  catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
  next();
};

exports.getProduct = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/detail", {
      title: "Detail", 
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getPolicy = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/return-policy", {
      title: "Policy",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAccount = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/account", {
      title: "Account",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getWishlist = async (req, res, next) => {
  try {
    if (!req.session.wishlist) {
      return res.status(200).render("pages/wishlist", {
          title: "Wishlist",   
          products: null
        }
      );
    }

    var wishlistSession = new Wishlist(req.session.wishlist);
    var wishlist = wishlistSession.generateArr()
    let products = []
    for (i = 0; i < wishlist.length; i++) {
      const product = await Product.findOne({name: wishlist[i].item.name}).exec();
      products.push(product)
    }
    return res.status(200).render("pages/wishlist", {
      title: "Wishlist",
      products: products,
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getCart = async (req, res, next) => {
  try {
    if (!req.session.cart) {
      return res.status(200).render("pages/cart", {
          title: "Cart",   
          products: null
        }
      );
    }

    var cartSession = new Cart(req.session.cart);
    var cart = cartSession.generateArr();
    let products = []
    for (i = 0; i < cart.length; i++) {
      const product = await Product.findOne({name: cart[i].item.name}).exec();
      products.push(product)
    }
    return res.status(200).render("pages/cart", {
        title: "Cart",   
        products: products,
        totalPrice: cart.totalPrice,
      }
    );
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getPayment = async (req, res, next) => {
  try {
    if (!req.session.cart.totalQty) {
      return res.redirect('/home');
    }

    var cart = new Cart(req.session.cart);

    return res.status(200).render("pages/payment", {
      title: "Checkout",
      total:  cart.totalPrice,
      products: cart.generateArr(),
      stripePublicKey: stripePublicKey
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.get404 = async (req, res, next) => {
  try {
    // Render template
    return res.status(404).render("pages/404", {
      title: "404",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};


