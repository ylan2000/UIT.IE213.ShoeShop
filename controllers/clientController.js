const {Product} = require('../models/productModel');
const Cart = require("../models/cartModel");
const Wishlist = require("../models/wishlistModel");
const {User} = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const stripeSecretKey = process.env.STRIPE_SECRET_KEY
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

exports.getFeedback = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/feedback", {
      title: "Feedback",
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

// get products
exports.getProducts = async (req, res, next) => {
  try {
    // get brand name
    const brand = req.params.brand || null;
    
    // --- pagination ---
    // get page query:
    const page = req.query.page * 1 || 1; // convert string to number, default query page is 1
    const limit = 12; // 12 products perpage
    const skip = (page - 1) * limit; // number of products is skipped on each page
    
    const numProducts = await Product.countDocuments({ "category.0.name": brand });

    if (req.query.page) {
      // if skip products is greater than total products
      if (skip >= numProducts) 
        return res.status(404).json({ status: "fail", message: err });
    }

    // --- search ---
    // get search info, if null, match all
    const searchQuery = req.query.search || null;
    const searchField = searchQuery ? searchQuery : ".+";

    // --- sort ---
    const sortQuery = req.query.sort || null;

    // default sort field is createdDate with criteria is asc
    let sortField = "createdDate", criteria = -1;
    
    if (sortQuery) {
      if (sortQuery == "lowest") {
        sortField = "price";
        criteria = 1;
      } else if (sortQuery == "highest") {
        sortField = "price";
        criteria = -1;
      } 
    } 

    // find products that match all query
    const products = await Product.find({ "category.0.name": brand, "name": new RegExp(searchField, "i") }).sort([[sortField, criteria]]).skip(skip).limit(limit);

    // Render template
    return res.status(200).render("pages/products", {
      title: brand || "Products", 
      product: products,
      current: page,
      pages: Math.ceil(numProducts / limit),
      searchQuery: searchQuery,
      sortQuery: sortQuery
    });
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getProduct = async (req, res, next) => {
  try {
    // Render template
    const slug = req.params.slug;
    const product = await Product.findOne({slug: slug}).exec();
    return res.status(200).render("pages/detail", {
      title: "Detail", product: product
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
      products.push({
        info: product,
        qty: cart[i].qty
      })
    }
    return res.status(200).render("pages/cart", {
        title: "Cart",   
        products: products,
        totalPrice: cartSession.totalPrice,
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
    //const user = await User.findOne({userName: req.session.user.userName}).exec()

    return res.status(200).render("pages/payment", {
      title: "Checkout",
      total:  cart.totalPrice,
      products: cart.generateArr(),
      //user: user,
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

exports.getLoginFirst = async(req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/login-first", { title: "Sign In"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }
  next();
}

exports.getPermissionDenied = async(req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/permission-denied", { title: "Sign In"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }
  next();
}

exports.getSignIn = async (req, res, next) => {
  try {
    
    // Render template
    return res.status(200).render("pages/signIn", { title: "Sign In"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getSignUp = async (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/signUp", { title: "Sign Up"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.logout = (req, res) => {
  req.logout();
  req.session.user = null;
  return res.redirect('back'); // redirect ve trang hien tai
}

exports.getOrder = (req, res, next) => {
  try {
    // Render template
    return res.status(200).render("pages/clientOrder", { title: "Order"});
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
}
