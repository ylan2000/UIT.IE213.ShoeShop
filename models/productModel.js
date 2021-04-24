const mongoose = require("mongoose");
const { Category } = require("./categoryModel");
const schema = mongoose.Schema;

const productSchema = schema({
  name: { type: String, required: true },
  coverImage: { type: Object, default:
    {
      data: {type: Buffer},
      type: {type: String}
    } },
  description: { type: String },
  detail: { type: String },
  price: { type: Number, default: 0, required: true },
  brand: { type: String },
  sale: { type: Number, default: 0 },
  condition: { type: Boolean, default: true },
  quantity: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now() },
  //transaction: { type: Schema.ObjectId, ref: 'Transaction', required: true },
  category: Array
});

productSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage.data != null && this.coverImage.type != null)
    return `data:${this.coverImage.type};charset:utf-8;base64,${this.coverImage.data.toString(
      "base64"
    )}`;
});

// pre hook save: add product's slug -> runs before the .save() command or .create() command
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// pre hook save: await embedded collections (category)
productSchema.pre('save', async function (next) {
  this.category = await Category.findById(this.category);
  next();
});

// post hook save: increase quntity by 1
productSchema.post('save', function (doc, next) {
  this.quantity++;
  next();
});


const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
