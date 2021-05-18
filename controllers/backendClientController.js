const {Product} = require("../models/productModel");
const {Transaction} = require('../models/transactionModel')
const Cart = require("../models/cartModel");
const Wishlist = require("../models/wishlistModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripe = require('stripe')(stripeSecretKey)


exports.addToCart = async (req, res, next) => {
  try {
    
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart: {items: {}});
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      cart.add(p, productId);
      req.session.cart = cart;
      req.session.save();
    });
    return res.send(cart);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};


exports.removeFromCart = async (req, res, next) => {
  try {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart);
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      cart.remove(p, productId);
      req.session.cart = cart;

      if (req.session.cart.totalQty == 0) {
        req.session.cart = undefined;
      }

      req.session.save();
    });
    return res.send(req.session.cart);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.updateCart = async (req, res, next) => {
  try {
    var productId = req.params.id;
    var newQty = req.body.newQty;
    
    var cart = new Cart(req.session.cart);
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      cart.updateQty(p, productId, newQty);
      req.session.cart = cart;
      req.session.save();
    });
    return res.send(req.session.cart);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.addToWishlist = async (req, res, next) => {
  try {
    
    var productId = req.params.id;
    var wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist: {items: {}});
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      wishlist.add(p, productId);
      req.session.wishlist = wishlist;
      req.session.save();
    });
    return res.send(req.session.wishlist);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};


exports.removeFromWishlist = async (req, res, next) => {
  try {
    var productId = req.params.id;
    var wishlist = new Wishlist(req.session.wishlist);
   
    await Product.findById(productId, function (err, p) {
      if (err) {
        return res.status(404).json({ status: "fail", message: err });    
      }
     
      wishlist.remove(productId);
      req.session.wishlist = wishlist;
      req.session.save();
    });
    return res.send(req.session.wishlist);
  } catch (err) {
    return res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.removeCart = async(req,res,next) => {
  req.session.cart = undefined;
  return res.send(req.session.cart)
}

exports.postPaymentDone = async (req, res) => {
  var type = req.body.type
  let total = 0
  let cart = req.body.cart
  let product = []
  for (i = 0; i < cart.length; i++) {
    const item = await Product.findById(cart[i].id)
    total =  total + item.price * 100 * cart[i].qty
    product.push({
      info: cart[i].id,
      qty: cart[i].qty
    })
  }
  if (type == "card") {
    await stripe.charges.create({
      amount: total,
      source: req.body.token,
      currency: 'usd',
    }).catch(function (err) {
      console.log(err)
      res.status(500).end()
    })
  }
  try {
    const trans = new Transaction({
      total: total,
      paymentType: type,
      product: product,
      status: true
    })
    const newTrans = await trans.save()
    console.log('Charge Successful')
    res.json({ message: 'Successfully purchased items\nYour order number: ' + newTrans._id })
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
  
}