const express = require('express');
const router = express.Router();
const { signup, signin, getAllUsers, deleteUserByID, updateUser, adminSignin, adminSignup, getUser } = require("../controller/auth_controller");
const { signinRequire, adminRequire } = require('../controller/common_middleware/common_middleware');


router.post('/signin', signin);
router.post('/admin/signin', adminSignin);
router.post('/signup', signup);
router.post('/admin/signup', adminSignup);
router.get('/users', signinRequire, adminRequire, getAllUsers);
router.get('/user', signinRequire, getUser);
router.put('/user', signinRequire, updateUser);
router.delete('/user/:id', signinRequire, adminRequire, deleteUserByID);

module.exports = router;