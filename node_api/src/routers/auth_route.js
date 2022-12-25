const express = require('express');
const router = express.Router();
const { signup, signin, getUserByID, getAllUsers, deleteUserByID, updateUserByID, adminSignin, adminSignup } = require("../controller/auth_controller");
const { signinRequire, adminRequire } = require('../controller/common_middleware/common_middleware');


router.post('/signin', signin);
router.post('/admin/signin', adminSignin);
router.post('/signup', signup);
router.post('/admin/signup', adminSignup);
router.get('/users', signinRequire, adminRequire, getAllUsers);
router.get('/user/:id', signinRequire, getUserByID);
router.put('/user/:id', signinRequire, updateUserByID);
router.delete('/user/:id', signinRequire, deleteUserByID);

module.exports = router;