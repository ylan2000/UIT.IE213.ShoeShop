const {Product} = require("../models/productModel")
exports.getHome = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("pages/home", { title: "Home" });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAbout = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("pages/about", { title: "About" });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getProducts = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("pages/products", {
      title: "Products",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getVans = async (req, res, next) => {
  try {
    const product = await Product.find();
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
    const product = await Product.find();
    // Render template
    res.status(200).render("pages/products", {
      title: "Palladium",
      products: product,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getConverse = async (req, res, next) => {
  try {
    const product = await Product.find();
    // Render template
    res.status(200).render("pages/products", {
      title: "Converse",
      products: product,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getProduct = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("pages/detail", {
      title: "Detail",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getPolicy = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("pages/return-policy", {
      title: "Policy",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getAccount = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("pages/account", {
      title: "Account",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getWishlist = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("pages/wishlist", {
      title: "Wishlist",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getCart = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("pages/cart", {
      title: "Cart",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getPayment = async (req, res, next) => {
  try {
    // Render template
    res.status(200).render("pages/payment", {
      title: "Payment",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.get404 = async (req, res, next) => {
  try {
    // Render template
    res.status(404).render("pages/404", {
      title: "404",
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};
