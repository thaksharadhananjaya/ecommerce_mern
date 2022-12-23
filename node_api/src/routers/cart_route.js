const express = require('express');
const router = express.Router();
const { getCartByUser, getAllCarts, addCartItem, updateCartItem, deleteCartByUserID } = require('../controller/cart_controller');
const { signinRequire, adminRequire } = require('../controller/common_middleware/common_middleware');

router.get('/user/cart', signinRequire, getCartByUser);
router.get('/carts', signinRequire, adminRequire, getAllCarts);
router.post('/user/cart', signinRequire, addCartItem);
router.put('/user/cart/:id', signinRequire, updateCartItem);
router.delete('/user/cart/clear', signinRequire, deleteCartByUserID);

module.exports = router;