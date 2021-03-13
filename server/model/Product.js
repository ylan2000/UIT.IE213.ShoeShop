const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ProductSchema = schema(
{
    Name:  {type: String},
    Image: {type: Array, default: []},
    Description: {type: String},
    Detail: {type: String},
    Price: {type: Number, default: 0},
    Brand: {type: String},
    Sale: {type: Number, default: 0},
    Condition: {type: Boolean, default: true},
    Quantity: {type: Number, default: 1}
})

ProductSchema.index
({

})

const Product = mongoose.model("Product",ProductSchema);
module.exports = {Product};