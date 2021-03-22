const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = schema({
  name: { type: String },
  image: { type: Array, default: [] },
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
  if (this.Image != null && this.ImageType != null)
    return `data:${this.ImageType};charset:utf-8;base64,${this.Image.toString(
      "base64"
    )}`;
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
