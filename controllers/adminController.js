const {Product} = require("../models/productModel")
const {Category} = require("../models/categoryModel")
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

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
    return res.status(200).render("admin/pages/product/product", {
      title: "Products",
      status: status
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
    res.status(200).render("admin/pages/product/product-add", {
      title: "Add Product",
      category: category,
      searchOptions: req.query,
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  next();
};

exports.getEditProduct = async (req, res, next) => {
  try {
    //get product for edit
    const product = await Product.findById(req.params.id);
    // Render template
    res.status(200).render("admin/pages/product/product-edit", {
      title: "Edit Product",
      product: product,
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
    product.description = req.body.productShortDesc;
    product.price = req.body.productPrice;
    const image = new Product()
    saveImage(image,req.body.productImg)
    product.image = image.image;
    await product.save()
    res.redirect("/admin/products");
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
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
