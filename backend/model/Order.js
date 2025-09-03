const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Menu',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        customisations: [String]
    }],
    total: {
        type: Number,
        required: true
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'paid'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;