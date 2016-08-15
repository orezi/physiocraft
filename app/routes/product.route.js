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

  app.use('/api', router);
  // frontend routes =========================================================
};