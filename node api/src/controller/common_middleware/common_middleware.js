
const jwt = require('jsonwebtoken');

exports.signinRequire = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (user) {
                req.user = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                };
                next();
            } else if (error) {
                return error.message == 'invalid token' ?
                    res.status(401).json({ message: 'Invalid token. Authenticate failed !' })
                    :
                    res.status(400).send(error);
            } else {
                return res.status(401).json({ message: 'Something went to wrong!' });
            }
        });
        // console.log(user);
    } else {
        return res.status(401).json({ message: 'Authorization required !' });
    }

}

exports.adminRequire = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Permission denied!' });
    }
}
