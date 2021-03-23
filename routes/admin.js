const router = require("./admin/product");
const productRouter = require("./admin/product");
const userRouter = require("./admin/user");

router.use("/product", productRouter);

router.use("/user", userRouter);

router.get("/", (req, res) => {
  res.status(200).render("admin/pages/dashboard", {
    title: "Dashboard",
  });
});

router.get("/dashboard", (req, res) => {
  res.status(200).render("admin/pages/dashboard", {
    title: "Dashboard",
  });
});

router.get("/category", (req, res) => {
  res.status(200).render("admin/pages/category/category", {
    title: "Category",
  });
});

router.get("/order", (req, res) => {
  res.status(200).render("admin/pages/order/order", {
    title: "Order",
  });
});

router.get("/feedback", (req,res) => {
  res.status(200).render("admin/pages/feedback", {
    title: "Feedback",
  });
});
module.exports = router;
