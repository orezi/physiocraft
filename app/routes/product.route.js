"use strict";
var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/product.controller');
var product = new ProductController();
var UserController = require('../controllers/user.controller');
var user = new UserController();

module.exports = function(app) {
  //define routes with functions
  router.route('/products')
    .get(user.verifyToken, product.getProducts)
    .post(user.verifyToken, product.addProduct)
    .delete(user.verifyToken, product.deleteAll);

  router.route('/product/:product_id')
    .get(user.verifyToken, product.getProduct)
    .put(user.verifyToken, product.updateProduct)
    .delete(user.verifyToken, product.deleteProduct);

  app.use('/api', router);
  // frontend routes =========================================================
};