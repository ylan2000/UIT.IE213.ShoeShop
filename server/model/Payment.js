const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PaymentSchema = schema(
{
    User: {type: Array, default: []},
    Product: {type: Array, default: []},
    Data: {type: Array, default: []}
})

const Payment = mongoose.model("Payment",PaymentSchema);
module.exports = {Payment};