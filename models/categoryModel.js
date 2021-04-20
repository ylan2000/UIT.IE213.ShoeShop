const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema({
    name: { type: String, maxlength: 50, required: true },
    categoryImage:{ type: Object, default:
    {
      data: {type: Buffer},
      type: {type: String}
    } }, 
    createdDate: { type: Date, default: Date.now() }
});

categorySchema.virtual("imagePath").get(function () {
    if (this.categoryImage.data != null && this.categoryImage.type != null)
      return `data:${this.categoryImage.type};charset:utf-8;base64,${this.categoryImage.data.toString(
        "base64"
      )}`;
  });

const Category = mongoose.model("Category", categorySchema);
module.exports = { Category };
