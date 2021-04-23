const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  image: { type: Array, default: [] },
  fullName: { type: String, maxlength: 50 },
  userName: { type: String, trim: true, unique: 1 },
  email: { type: String, trim: true, unique: 1 },
  address: { type: String },
  phone: { type: String, maxlength: 10 },
  password: { type: String, minglength: 5 },
  role: { type: Number, default: 0 }, // 0: client, 1: admin
  createdDate: { type: Date, default: Date.now() },
  avatarImage:{ type: Object, default:
    {
      data: {type: Buffer},
      type: {type: String}
    } },
});

userSchema.virtual("avatarImagePath").get(function () {
  if (this.avatarImage.data != null && this.avatarImage.type != null)
    return `data:${this.avatarImage.type};charset:utf-8;base64,${this.avatarImage.data.toString(
      "base64"
    )}`;
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
