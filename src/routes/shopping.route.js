const router = require('express').Router();
const shoppingController = require('../controller/shopping.controller');

module.exports = (app) => {
    router.get('/products', shoppingController.getAllproducts);
    router.post('/checkout', shoppingController.checkoutProduct);
    router.get('/orders/all-orders', shoppingController.getAllOrders);
    router.get('/orders/:productOrderId', shoppingController.getOrderDetails);
  
    app.use('/api', router);
  };