const {Product} = require("../model/Product");
const express = require("express");
const router = express.Router();

router.post("/admin/product/insertData",async (req,res) =>
{
    const product = new Product
    ({
        Name: req.body.productName,
    })
    try {
        const newProduct = await product.save();
        res.redirect(``);
    } catch (error) 
    {
        res.render("error");    
    }
})

module.exports = router;