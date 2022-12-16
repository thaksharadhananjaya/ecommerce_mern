const express = require('express');
const router = express.Router();
const { addCategory, getCategoryByID, deleteCategoryByID, getAllCategories, updateCategory } = require('../controller/category_controller');
const { signinRequire, adminRequire } = require('../controller/common_middleware/common_middleware');

router.get('/categories', getAllCategories);
router.get('/category/:id', getCategoryByID);
router.post('/category', signinRequire, adminRequire, addCategory);
router.put('/category/:id', signinRequire, adminRequire, updateCategory);
router.delete('/category/:id', signinRequire, adminRequire, deleteCategoryByID);

module.exports = router;