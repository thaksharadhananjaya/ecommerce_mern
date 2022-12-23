const express = require('express');
const multer = require('multer');
const router = express.Router();
const { signinRequire, adminRequire } = require('../controller/common_middleware/common_middleware');
const { getAllProducts, getProductByID, addProduct, updateProduct, deleteProductByID, getProductByCategories } = require('../controller/product_controller');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError;
        if (!isValid) {
            uploadError = new Error('Invalid file type');
        }
        cb(uploadError, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1E9)}`;
        const extension = FILE_TYPE_MAP[file.mimetype];
        const fileName = file.originalname.trim().split(/\s+/).join('_').split('.')[0].replace('.jpg', '');

        console.log(fileName);
        cb(null, `${fileName}_${uniqueSuffix}.${extension}`);
    }
});

const upload = multer({ storage });

router.get('/products', getAllProducts);
router.get('/product/category', getProductByCategories);
router.get('/product/:id', getProductByID);
router.post('/product', signinRequire, adminRequire, upload.array('images', 5), addProduct);
router.put('/product/:id', signinRequire, adminRequire, upload.array('images', 5), updateProduct);
router.delete('/product/:id', signinRequire, adminRequire, deleteProductByID);

module.exports = router;