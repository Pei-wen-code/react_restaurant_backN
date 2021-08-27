const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const privateKey = JSON.parse(process.env.PRIVATE_KEY);
const publicKey = JSON.parse(process.env.PUBLIC_KEY);
// require('dotenv').config();
// const privateKey = process.env.PRIVATE_KEY;
// const publicKey = process.env.PUBLIC_KEY;

const usersController = {
    register: (req, res) => {
        const { username, email, password } = req.body;

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                User.create({
                    username,
                    email,
                    password: hash
                })
                .then(() => {
                    jwt.sign({ data: username }, privateKey , { algorithm: 'RS256' }, (err, token) => {
                        if (err) return res.json({ok: 0, message: 'Something went wrong. Please try again.'})
                        res.json({ok: 1, token});
                    })
                })
                .catch(err => {
                    return res.json({ok: 0, message: err});
                })
            })
        })
    },
    getMe: (req, res) => {
        const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, publicKey, (err, authData) => {
            if(err) return res.json({ok: 0, message: 'Invalid user'});
            res.json({ok: 1, authData});
        })
    },
    login: (req, res) => {
        const { username, password } = req.body;
        
        User.findOne({
            where: {
                username,
            },
        })
        .then(userData => {
            if (!userData) return res.json({ok: 0, message: 'Incorrect username or password.'});
            bcrypt.compare(password, userData.password, (err, results) => {
                if (!results) return res.json({ok:0, message: 'Incorrect username or passowrd.'});

                jwt.sign({ data: userData.username, id: userData.id }, privateKey, { algorithm: 'RS256' }, (err, token) => {
                    if (err) return res.json({ok: 0, message: 'Something went wrong. Please try again.'})
                    res.json({ok: 1, token});
                })
            })
        })
        .catch(err => {
            return res.json({ok: 0, message: err});
        })
    }
}

module.exports = usersController;