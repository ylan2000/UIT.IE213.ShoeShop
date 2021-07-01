const {Product} = require('../models/productModel');
const Cart = require("../models/cartModel");
const Wishlist = require("../models/wishlistModel");
const {Transaction} = require('../models/transactionModel');
const dotenv = require("dotenv");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require('../utils/catchAsync');

dotenv.config({ path: "./config.env" });

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

exports.getHome = catchAsync(async (req, res, next) => {
  const products = await (await Product.find().sort({createdDate: -1})).slice(0, 8);
  
  return res.status(200).render("pages/home", { title: "Home", product: products});
});

exports.getAbout = catchAsync(async (req, res, next) => {
  return res.status(200).render("pages/about", { title: "About" });
});

exports.getFeedback = catchAsync(async (req, res, next) => {
  return res.status(200).render("pages/feedback", {
    title: "Feedback",
  });
});

// get products
exports.getProducts = catchAsync(async (req, res, next) => {
  let filter = {}

  // get info for sending data to view
  brand = req.params.brand || null;

  // get brand name
  if (brand) {
    filter = { "category.0.name": brand }
  }

  const limit = 12; // limit products on each page

  const page = req.query.page * 1 || 1; // convert string to number
  const searchQuery = req.query.search || null; // get search info
  const sortQuery = req.query.sort || null; // get search query

  const numProducts = await Product.countDocuments(filter); // total number of products

  // execute query
  const features = new APIFeatures(Product.find(filter), req.query)
    .search()
    .sort()
    .paginate(limit);

  const products = await features.query;

  // Render template
  return res.status(200).render("pages/products", {
    title: brand || "Products",
    product: products,
    current: page,
    pages: Math.ceil(numProducts / limit),
    searchQuery: searchQuery,
    sortQuery: sortQuery
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const product = await Product.findOne({ slug: slug }).exec();
  return res.status(200).render("pages/detail", {
    title: "Detail", product: product
  });
});

exports.getPolicy = catchAsync(async (req, res, next) => {
  return res.status(200).render("pages/return-policy", {
    title: "Policy",
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  return res.status(200).render("pages/account", {
    title: "Account",
  });
});

exports.getWishlist = catchAsync(async (req, res, next) => {
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
});

exports.getCart = catchAsync(async (req, res, next) => {
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
    const product = await Product.findOne({ name: cart[i].item.name }).exec();
    products.push(product)
  }
  return res.status(200).render("pages/cart", {
    title: "Cart",
    products: products,
    totalPrice: cart.totalPrice,
  }
  );
});

exports.getPayment = catchAsync(async (req, res, next) => {
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
});

exports.postPaymentDone = catchAsync(async(req, res) => {
  //console.log(req.body.stripeTokenId)
  stripe.charges.create({
    amount: req.body.total,
    source: req.body.stripeTokenId,
    currency: 'usd',
  }).then(async function(){
    const trans = new Transaction({
      total: req.body.total,
      status: true
    })
    const newTrans = await trans.save()
    console.log('Charge Successful')
    res.json({ message: 'Successfully purchased items' })
  }).catch(function(err){
    console.log(err)
    res.status(500).end()
  })
});

exports.getLoginFirst = catchAsync(async(req, res, next) => {
  return res.status(200).render("pages/login-first", { title: "Sign In"});
});

exports.getPermissionDenied = catchAsync(async(req, res, next) => {
  return res.status(200).render("pages/permission-denied", { title: "Sign In"});
});

exports.getSignIn = catchAsync(async (req, res, next) => {
  return res.status(200).render("pages/signIn", { title: "Sign In"});
});

exports.getSignUp = catchAsync(async (req, res, next) => {
  return res.status(200).render("pages/signUp", { title: "Sign Up"});
});

exports.logout = (req, res) => {
  req.logout();
  req.session.user = null;
  return res.redirect('back'); // redirect ve trang hien tai
}

exports.getOrder = catchAsync(async (req, res, next) => {
  return res.status(200).render("pages/clientOrder", { title: "Order"});
});
