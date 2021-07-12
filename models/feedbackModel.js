const mongoose = require("mongoose");
const schema = mongoose.Schema;

const feedbackSchema = new schema({
    feedback: { type: String, required: [true, 'Feedback must have message'] },
    starNumber:{ type: Number, min: 1, max: 5 }, 
    isAccept: { type: Boolean},
    user: { type: schema.ObjectId, ref: 'User', required: [true, 'Feedback must belong to a user.'] },
    product: { type: schema.ObjectId, ref: 'Product', required: [true, 'Feedback must belong to a product.'] },
    createdDate: { type: Date, default: Date.now() },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = { Feedback };