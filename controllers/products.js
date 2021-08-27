const db = require('../models');
const Product = db.Product;

const { cloudinary } = require('../cloudinary');

const productsController = {
    addProduct: (req, res) => {
        const imageFile = req.file.path;
        const { product, price, type, desc } = req.body;

        cloudinary.uploader.upload(imageFile, {
            upload_preset: process.env.upload_preset
        }, (err, result) => {
            const url = result.secure_url;

            Product.create({
                product,
                price,
                type,
                description: desc,
                url
            })
            .then( results => {
                res.json({ok: 1, message: results})
            })
            .catch(err => {
                return res.json({ok: 0, message: err});
            });
        });
    },
    getProducts: (req, res) => {
        const { type } = req.params;

        Product.findAll({
            where: {
                type,
            },
            order: [['id', 'DESC']],
        })
        .then(products => {
            res.json({ok: 1, message: products})
        })
        .catch(err => {
            return res.json({ok: 0, message: err});
        });
    },
    deleteProduct: (req, res) => {
        const { id } = req.params;

        Product.findOne({
            where: {
                id,
            },
        })
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.json({ok: 1, message: result});
        })
        .catch(err => {
            return res.json({ok: 0, message: err});
        });
    },
    updateProduct: (req, res) => {
        const { id } = req.params;
        const imageFile = req.file.path;
        const { product, price, type, desc } = req.body;

        cloudinary.uploader.upload(imageFile, {
            upload_preset: 'yqwywlyy'
        }, (err, result) => {
            const url = result.secure_url;

            Product.findOne({
                where: {
                    id,
                },
            })
            .then(productInfo => {
                return productInfo.update({
                    product,
                    price,
                    type,
                    description: desc,
                    url
                });
            })
            .then(result => {
                res.json({ok: 1, message: result});
            })
            .catch(err => {
                return res.json({ok: 0, message: err});
            });
        });
    },
    updateProductText: (req, res) => {
        const { id } = req.params;
        const { product, price, type, desc } = req.body;

        Product.findOne({
            where: {
                id,
            },
        })
        .then(productinfo => {
            return productinfo.update({
                product,
                price,
                type,
                description: desc,
            });
        })
        .then(result => {
            res.json({ok: 1, message: result});
        })
        .catch(err => {
            return res.json({ok: 0, message: err});
        });
    }
}

module.exports = productsController