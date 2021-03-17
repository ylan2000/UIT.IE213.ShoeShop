const mongoose = require("mongoose");
const schema = mongoose.Schema;

const paymentSchema = schema(
{
    User: {type: Array, default: []},
    Product: {type: Array, default: []},
    Data: {type: Array, default: []}
})

const Payment = mongoose.model("Payment",paymentSchema);
module.exports = {Payment};