const router = require("./admin/product");
const productRouter = require("./admin/product");
const userRouter = require("./admin/user");

router.use("/product", productRouter);

router.use("/user", userRouter);

router.get("/", (req, res) => {
  res.redirect("/dashboard");
  /*res.status(200).render("admin/pages/dashboard", {
        title: "Dashboard",
    });*/
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

module.exports = router;
