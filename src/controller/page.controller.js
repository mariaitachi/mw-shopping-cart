const path = require('path');

exports.getProductPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../web/index.html'));
    res.status = 200;
};

exports.getCheckoutPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../web/checkout.html'));
    res.status = 200;
};

exports.productJs = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../web/product.js'));
    res.status = 200;
};
exports.checkoutJs = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../web/checkout.js'));
    res.status = 200;
};