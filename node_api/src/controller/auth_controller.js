const AuthModel = require('../models/auth_model');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        role
    } = req.body;

    const userModel = new AuthModel({
        firstName,
        lastName,
        email,
        password,
        username: Math.random().toString(),
        role: role || 'user'
    });
    // Create user
    userModel.save((error, data) => {
        if (error) {
            if (error.code == 11000)
                return res.status(400).json({ message: 'Email already used!' })
            return res.status(400).json(error);
        }
        if (data) {
            return res.status(201).json({
                message: "User created successful!"
            })
        }
    });
}

exports.signin = (req, res) => {

    AuthModel.findOne({ email: req.body.email }).exec((error, user) => {
        if (error) {
            return res.status(400).json(error);
        }
        if (user && user.authenticate(req.body.password)) {
            const { firstName, lastName, email, username, _id, role } = user;
            const token = jwt.sign({
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            return res.status(200).json({
                success: true,
                token,
                user: {
                    _id,
                    email,
                    username,
                    firstName,
                    lastName,
                    role
                }
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Authenticate failed !"
            });
        }
    });
}

exports.getAllUsers = (req, res) => {

    AuthModel.find().select('-hash_password -__v').exec((error, users) => {
        if (users) {
            return res.status(200).json(users);
        }
        if (error) {
            return res.status(400).json(error);
        }
    });

}

exports.updateUserByID = async (req, res) => {
    if (req.user.role === 'admin' || req.params.id === req.user.id) {
        const {
            firstName,
            lastName,
            email,
            password,
            oldPassword,
            username,
            role
        } = req.body;
        try {
            const userModel = AuthModel({
                firstName,
                lastName,
                email,
                password,
                username,
                role: role || 'user'
            });
            if (role && role != 'admin' && role != 'user')
                return res.status(400).json({ message: 'Invalid user role!' });

            if (password && oldPassword)
                user = await AuthModel.findById(req.params.id);

            if (!password || (oldPassword && user.authenticate(oldPassword))) {

                if (await AuthModel.findByIdAndUpdate(req.params.id, {
                    firstName: userModel.firstName,
                    lastName: userModel.lastName,
                    hash_password: userModel.hash_password,
                    username: userModel.username,
                    role: userModel.role,
                    email: userModel.email
                }))
                    return res.status(200).json({ message: 'Update successful!' });
                return res.status(400).json({ message: 'Invalid ID!' });
            } else {
                return res.status(200).json({ message: "Old password doesn't match!" });
            }

        } catch (error) {
            if (error.kind == 'ObjectId')
                return res.status(400).json({ message: 'Invalid ID!' });
            if (error.code == 11000)
                return res.status(400).json({ message: 'Email already used!' })

            return res.status(500).json({ message: 'Something went to wrong!' });
        }
    } else {
        return res.status(403).json({
            message: 'Permission denied !'
        });
    }
}

exports.getUserByID = (req, res) => {
    if (req.user.role === 'admin' || req.params.id === req.user.id) {
        AuthModel.findById(req.params.id).select('-hash_password -__v').exec((error, user) => {
            if (user) {
                return res.status(200).json(user);
            } else if (error) {
                if (error.kind == 'ObjectID')
                    return res.status(404).json({ message: 'Invalid ID. User not found!' });
                return res.status(400).json(error);
            } else {
                return res.status(404).json({ message: 'Invalid ID. User not found!' });
            }
        });
    } else {
        return res.status(403).json({
            message: 'Permission denied !'
        });
    }
}

exports.deleteUserByID = (req, res) => {
    if (req.user.role === 'admin') {

        AuthModel.findById(req.params.id).deleteOne((error, data) => {
            if (data['deletedCount'] > 0) {
                return res.status(200).json(
                    {
                        message: 'Delete successful !'
                    });
            } else if (error) {
                if (error.kind == 'ObjectId')
                    return res.status(400).json({ message: 'Invalid ID!' });
                return res.status(400).json(error);
            } else {
                return res.status(400).json({ message: 'Invalid ID !' });
            }
        });
    } else {
        return res.status(403).json({
            message: 'Permission denied !'
        });
    }
}