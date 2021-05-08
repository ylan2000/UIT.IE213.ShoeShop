const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transactionSchema = new schema({
    status: { type: Boolean},
    amount:{ type: Number, min: 1}, 
    product:{
        type: Array,
        default: []
    },
    total: { type: Number},
    //user: { type: Schema.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now() },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = { Transaction };