const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema = mongoose.Schema;

const transactionSchema = new schema({
    _id: {type: Number},
    status: { type: Boolean},
    paymentType: {type: String},
    deliveryType: {type: Number}, //1. Standard, 2.....
    product:{
        type: Array,
        default: [{
            info: {type: schema.ObjectId, ref: 'Product', required: true},
            qty: {type: Number}
        }]
    },
    total: { type: Number},
    user: {
        fullname: {type: String},
        email: {type: String},
        phone: {type: String},
        address: {
            number: {type: String},
            city: {type: String},
            state: {type: String},
            ward: {type: String},
        },
        updateRequired: {type: Boolean},
    },
    //user: { type: Schema.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now() },
}, {_id: false});

transactionSchema.plugin(AutoIncrement);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = { Transaction };