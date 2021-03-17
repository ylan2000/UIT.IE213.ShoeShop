const express = require('express');
const router = express.Router();
const { User } = require('../../model/user');

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
