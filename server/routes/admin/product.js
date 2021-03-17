const {Product} = require("../../model/product");
const express = require('express');
const router = express.Router();


//Get
//Index
router.get("/", (req, res) => {
    res.status(200).render("admin/pages/product/product", {
      title: "Products",
    });
});

//Add
router.get("/add", (req, res) => {
    res.status(200).render("admin/pages/product/product-add", {
      title: "Add Product",
    });
});

//Edit
router.get("/edit", (req, res) => {
    res.status(200).render("admin/pages/product/product-edit", {
      title: "Edit Product",
    });
});


//Post
router.post("/insertData",async (req,res) =>
{
    const product = new Product
    ({
        Name: req.body.productName,
    })
    try {
        //const newProduct = await product.save();
        res.send(req.body.productName);
    } catch (error) 
    {
        res.render("error");    
    }
})

module.exports = router;