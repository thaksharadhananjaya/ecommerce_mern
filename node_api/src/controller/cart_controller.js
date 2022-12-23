const ProductModel = require('../models/product_model');
const AuthModel = require('../models/auth_model');
const CartModel = require('../models/cart_model');

exports.addCartItem = async (req, res) => {
    const userID = req.user.id;
    const cartItem = req.body.cartItem;
    try {

        let cart = await CartModel.findOne({ userID });
        const product = cartItem.product;
        if (cart) {
            const item = cart.cartItems.find(cartItm => cartItm.product == product);

            if (item) {//Update quantity of already exists item      
                const data = await CartModel.findOneAndUpdate({ 'userID': userID, 'cartItems.product': product },
                    {
                        '$set': {
                            'cartItems.$': {
                                ...cartItem,
                                quantity: cartItem.quantity + item.quantity
                            }
                        }
                    }
                );
                if (data)
                    return res.status(201).json({ message: 'Cart item added successful !' });

                return res.status(500).json({ message: 'Something went to wrong' });
            } else {// Push new item to already exists cart

                if (await ProductModel.findById(product)) {
                    const data = await CartModel.updateOne({ 'userID': userID }, {
                        '$push': {
                            cartItems: cartItem
                        }
                    });
                    if (data)
                        return res.status(201).json({ message: 'Cart item added successful !' });

                    return res.status(500).json({ message: 'Something went to wrong' });

                }
                return res.status(400).json({ message: 'Invalid product ID!' });
            }
        } else {//Create new cart
            if (await ProductModel.findById(product)) {
                const cartModel = new CartModel({
                    userID,
                    cartItems: cartItem
                });
                if (await cartModel.save())
                    return res.status(201).json({ message: 'Cart item added successful !' });

                return res.status(500).json({ message: 'Something went to wrong' });
            }
            return res.status(400).json({ message: 'Invalid product ID!' });
        }
    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid Product ID!' });
        else if (error.reason.kind == 'Number')
            return res.status(400).json({ message: 'Invalid quantity. Please Enter numerical value!' });
        return res.status(500).json({ message: 'Something went to wrong' });
    }

}

exports.updateCartItem = async (req, res) => {

    const userID = req.user.id;
    const quantity = req.body.quantity;
    console.log(quantity)
    if (typeof quantity !== "number")
        return res.status(400).json({ message: 'Invalid quantity! Please send numerical value' });
    try {
        const data = await CartModel.findOneAndUpdate({ 'userID': userID, 'cartItems._id': req.params.id },
            {
                '$set': {
                    'cartItems.$': {
                        ...cartItem,
                        quantity: quantity
                    }
                }
            }
        );
        if (data)
            return res.status(201).json({ message: 'Cart item updated successful!' });

        return res.status(500).json({ message: 'Something went to wrong' });

    } catch (error) {
        if (error.kind == 'ObjectId')
            return res.status(400).json({ message: 'Invalid Product ID!' });
        return res.status(500).json(error);
    }

}

exports.getAllCarts = async (req, res) => {
    try {
        const cart = await CartModel.find().select('-__v -userID').populate({
            path: 'cartItems.product', select: 'name quantity price images'
        });
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
        const cart = await CartModel.findOne({ userID: req.user.id }).select('-__v -userID').populate({
            path: 'cartItems.product', select: 'name quantity price images'
        });
        if (cart)
            return res.status(200).json(cart);

        return res.status(404).json({ message: 'Cart empty!' });
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

exports.removeCartItemByID = async (req, res) => {
    try {
        if (await CartModel.findOneAndUpdate({ userID: req.user.id }, {
            '$pull': {
                'cartItems': { '_id': req.parms._id }
            }
        }))
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
