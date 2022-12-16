const ProductModel = require('../models/product_model');
const AuthModel = require('../models/auth_model');
const CartModel = require('../models/cart_model');

exports.addCartItem = async (req, res) => {

    const { cartItem } = req.body;
    try {
        const cartModel = new CartModel({
            userID: req.user.userID,
            cartItem
        });
        for (let item of cartItem) {

        }
        if (await AuthModel.findById(userID)) {


        } else {
            const cart = await cartModel.save();
            if (cart)
                return res.status(201).json({ message: 'Cart items added successful !' });

            return res.status(500).json({ message: 'Something went to wrong' });
        }
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid user ID!' });
        return res.status(500).json({ message: 'Something went to wrong' });
    }

}

exports.updateCartItem = async (req, res) => {

    const { name, categoryID, quantity, price, description } = req.body;
    let files = req.files.map(file => { return file.originalname });
    /* if (req.files.length > 0 && req.files.length < 6) {
        
    } else if (req.files.length > 5) {
        return res.status(400).json({ message: 'Maximum 5 images only!' });
    } */

    try {
        if (!await CategoryModel.findById(categoryID)) {
            if (error.kind == 'ObjectId')
                return res.status(400).json({ message: 'Invalid category ID!' });
            return res.status(500).json({ message: 'Something went to wrong' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Invalid category ID!' });
    }
    try {
        const productModel = {
            name,
            slug: name,
            category: categoryID,
            price,
            quantity,
            images: files,
            description
        };
        if (await ProductModel.findByIdAndUpdate(req.params.id, {
            name: productModel.name,
            slug: productModel.slug,
            category: productModel.category,
            price: productModel.price,
            quantity: productModel.quantity,
            images: productModel.images
        }))
            return res.status(200).json({ message: 'Update successful!' });

        return res.status(400).json({ message: 'Invalid product ID!' });
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid product ID!' });

        return res.status(500).json({ message: 'Something went to wrong' });
    }


}

exports.getAllCarts = async (req, res) => {
    try {
        const cart = await CartModel.find().select('-__v');
        if (cart && cart.length > 0) {
            return res.status(200).json(products);
        }
        return res.status(404).json({ message: 'Carts not found!' });
    } catch (error) {
        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}

exports.getCartByUser = async (req, res) => {
    try {
        const cart = await CartModel.findOne({ userID: req.user.id }).select('-__v');
        if (cart)
            return res.status(200).json(cart);

        return res.status(404).json({ message: 'Not found cart!' });
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid user ID!' });

        return res.status(500).json({ message: 'Something want to wrong!' });
    }
}

exports.deleteCartByUserID = async (req, res) => {
    try {
        if (await CartModel.findOneAndDelete({ userID: req.user.id }))
            return res.status(200).json({
                message: 'Delete successful!'
            });
        return res.status(400).json({ message: 'Invalid user ID!' });

    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid user ID!' });

        return res.status(500).json({ message: 'Something want to wrong!' });
    }

}


