const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  image: { type: Array, default: [] },
  fullName: { type: String, maxlength: 50 },
  username: { type: String, trim: true, unique: 1 },
  email: { type: String, trim: true, unique: 1 },
  address: { type: String },
  phone: { type: String, maxlength: 10 },
  password: { type: String, minglength: 5 },
  role: { type: Number, default: 0 }, // 0: client, 1: admin
  date: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
