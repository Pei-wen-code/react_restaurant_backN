const jwt = require('jsonwebtoken');
// require('dotenv').config();
const publicKey = JSON.parse(process.env.PUBLIC_KEY);
// const publicKey = process.env.PUBLIC_KEY;

const utils = {
    verifyToken: (req, res, next) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (token !== 'undefined') {
            jwt.verify(token, publicKey, (err, authData) => {
                if (err) return res.json({ok: 0, messgae: 'Invalid user.'});
                next();
            })
        }
    }
};

module.exports = utils;
