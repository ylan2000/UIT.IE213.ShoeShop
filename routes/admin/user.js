const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("admin/pages/user/user", {
    title: "Users",
  });
});

router.get("/add", (req, res) => {
  res.status(200).render("admin/pages/user/user-add", {
    title: "Add User",
  });
});

module.exports = router;
