const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: 'User'
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        quantity: Number
    }],


}, { timestamps: true });

module.exports = mongoose.model("Cart", productSchema);
