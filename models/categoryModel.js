const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema({
    name: { type: String, maxlength: 50, required: true },
    image:{ type: Object, default:
    {
      data: {type: Buffer},
      type: {type: String}
    } }, 
    createdDate: { type: Date, default: Date.now() }
});

categorySchema.virtual("imagePath").get(function () {
    if (this.Image != null && this.ImageType != null)
      return `data:${this.ImageType};charset:utf-8;base64,${this.Image.toString(
        "base64"
      )}`;
  });

const Category = mongoose.model("Category", categorySchema);
module.exports = { Category };
