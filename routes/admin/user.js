const express = require("express");
const router = express.Router();
const { User } = require("../../models/userModel");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

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


//post add
router.post("/insert", async (req,res) => {
  const user = new User({
    fullname: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
  })
  saveImage(user, req.body.usrImg);
  try {
    const newUser = await user.save();
    res.redirect("/admin/user");
  } catch (error) {
    res.send(error);
  }
})


function saveImage(user, coverEncoded) {
  if (coverEncoded == null) return;
  const image = JSON.parse(coverEncoded);
  if (image != null && imageMimeTypes.includes(image.type)) {
    user.image.data = new Buffer.from(image.data,'base64');
    user.image.type = image.type;
  }
}

module.exports = router;
