const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema
({
    Image: {type: Array, default:[]},
    Name: {type: String, maxlength: 10},
    FullName: {type: String, maxlength: 50},
    Username: {type: String, trim: true, unique: 1},
    Email: {type: String, trim: true, unique: 1},
    Address: {type: String},
    Phone: {type: String, maxlength: 10},
    Password: {type: String, minglength: 5},
    Role: {type: Number, default: 0},
    Cart: {type: Array, default: []},
    History: {type: Array, default: []},
})


userSchema.methods.comparePassword = function(PasswordIn)
{}

const User = mongoose.model("User",userSchema);
module.exports = {User};

//Cần xác dịnh số nào tượng trưng cho role nào