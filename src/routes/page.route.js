const router = require('express').Router();
const pageController = require('../controller/page.controller');

module.exports = (app) => {
    router.get('/', pageController.getProductPage);
    
    router.get('/productjs', pageController.productJs);
    
    router.get('/checkout', pageController.getCheckoutPage);

    router.get('/checkoutjs', pageController.checkoutJs);


    app.use('/', router);
  };