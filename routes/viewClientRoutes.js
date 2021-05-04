const express = require("express");
const clientController = require("../controllers/clientController");

const router = express.Router();

// --- public routes
router.get("/", clientController.getHome);

router.get("/home", clientController.getHome);

router.get("/products", clientController.getProducts);

router.get("/product/:slug", clientController.getProduct);

router.get("/return-policy", clientController.getPolicy);

// --- protected routes
router.get("/about", clientController.getAbout);

router.get("/orders", (req, res) => {
  res.status(200).render("pages/orders", {
    title: "Orders",
  });
});

router.get("/order-detail", (req, res) => {
  res.status(200).render("pages/order-detail", {
    title: "Order Detail",
  });
});

//users
router.get("/account", clientController.getAccount);

router.get("/wishlist", clientController.getWishlist);

//Check out
router.get("/cart", clientController.getCart);

//Error Pages
router.get("*", clientController.get404);

router.post("/payment", clientController.postCheckout)

module.exports = router;
