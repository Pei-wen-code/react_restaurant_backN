require('dotenv').config();
const db = require('../models');
const Reserve = db.Reservation;
const User = db.User;
const stripe = require('stripe')(process.env.REACT_STRIP_SK);
const uuid = require('uuid').v4;

const reserveController = {
    getReserve: (req,res) => {
        const { date } = req.params;

        Reserve.findAll({
            where: {
                date,
            },
            attributes: {exclude: ['username','createdAt', 'updatedAt', 'UserId']},
            include: [{
                model: User,
                attributes: {exclude: ['id', 'username', 'password', 'createdAt', 'updatedAt']},
            }],
            order: [['timeIndex', 'ASC']],
        }).then(bookings => {
            res.json({ ok: 1, message: bookings});
        }).catch(err => {
            return res.json({ ok: 0, message: err});
        });
    },
    createReserve: (req, res) => {
        const { user, userId, firstname, lastname, mobile, num, dateChoosen, timeChoosen } = req.body;

        Reserve.create({
            username: user,
            firstname,
            lastname,
            mobile,
            num,
            date: dateChoosen,
            timeIndex: timeChoosen,
            UserId: userId,
        })
        .then(results => {
            res.json({ ok: 1, message: results});
        })
        .catch(err => {
            return res.json({ ok: 0, message: err});
        });
    },
    bookingFee: (req, res) => {
        const { token, product } = req.body;
        const idempotencyKey = uuid();

        return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then((customer) => {
            stripe.charges.create({
                amount: product.price * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: product.name,
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.address_country,
                        line1: token.card.address_line1
                    }
                }
            }, {idempotencyKey})
        })
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err))
    },
    getUserBooking: (req, res) => {
        const { username } = req.params;

        Reserve.findAll({
            where: {
                username,
            },
            order: [['id', 'DESC']],
        })
        .then(bookings => {
            res.json({ ok: 1, message: bookings});
        })
        .catch(err => {
            return res.json({ ok: 0, message: err});
        });
    },
    getUserInfo: (req, res) => {
        const { username } = req.params;

        User.findOne({
            where: {
                username,
            },
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
        })
        .then(results => {
            res.json({ ok: 1, message: results});
        })
        .catch(err => {
            return res.json({ ok: 0, message: err});
        });
    },
    updateMail: (req, res) => {
        const { id } = req.params;
        const { email } = req.body;

        User.findOne({
            where: {
                id,
            }
        })
        .then(user => {
            return user.update({
                email,
            })
        })
        .then(result => {
            res.json({ok: 1, message: result});
        })
        .catch(err => {
            return res.json({ ok: 0, message: err});
        });
    },
    isPaid: (req, res) => {
        const { id } = req.params;

        Reserve.findOne({
            where: {
                id,
            }
        })
        .then(user => {
            return user.update({
                isPaid: 1,
            })
        })
        .then(result => {
            res.json({ok: 1, message: result});
        })
        .catch(err => {
            return res.json({ ok: 0, message: err});
        });
    },
    cancelReserve: (req, res) => {
        const { id } = req.params;

        Reserve.findOne({
            where: {
                id,
            }
        })
        .then(user => {
            return user.destroy()
        })
        .then(result => {
            res.json({ ok: 1, message: result});
        })
        .catch(err => {
            return res.json({ ok: 0, message: err});
        });
    },
    updateReserve: (req, res) => {
        const { id } = req.params;
        const { newDate, time, num } = req.body;

        Reserve.findOne({
            where: {
                id,
            }
        })
        .then(booking => {
            return booking.update({
                num,
                date: newDate,
                timeIndex: time
            })
        })
        .then(result => {
            res.json({ ok: 1, message: result});
        })
        .catch(err => {
            return res.json({ ok: 0, message: err});
        });
    }
};

module.exports = reserveController;