const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = schema({
  name: { type: String },
  image: { type: Object, default: 
  {
    data: {type: Buffer},
    type: {type: String}
  } },
  description: { type: String },
  detail: { type: String },
  price: { type: Number, default: 0 },
  brand: { type: String },
  sale: { type: Number, default: 0 },
  condition: { type: Boolean, default: true },
  quantity: { type: Number, default: 1 },
  date: { type: Date, default: Date.now() },
});

productSchema.virtual("imagePath").get(function () {
  if (this.image.data != null && this.image.type != null)
    return `data:${this.image.type};charset:utf-8;base64,${this.image.data.toString(
      "base64"
    )}`;
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
