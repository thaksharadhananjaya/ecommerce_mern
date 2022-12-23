const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 40
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        max: 200
    },
    images: [{
        type: String,
    }]
}, { timestamps: true });



module.exports = mongoose.model("Product", productSchema);
