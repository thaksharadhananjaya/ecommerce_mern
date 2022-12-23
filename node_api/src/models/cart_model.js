const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        require:true,
        ref: 'User'
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require:true
        },
        quantity: {type:Number, require: true, default: 1}
    }],


}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
