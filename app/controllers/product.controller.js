'use strict';
require('../models/user.model');
require('../models/product.model');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var config = require('../../config/db');

var ProductController = function() {}

ProductController.prototype.checkUserRole = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.operation == true) {
      return user;
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not operations user'
      });
    }
  });
};

ProductController.prototype.getProducts = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.operation == true) {
      Product.find(function(err, products) {
        if (err) {
          return res.json(err);
        }
        if (!products) {
          return res.json({
            success: false,
            message: 'No products found'
          });
        }
        return res.json(products);
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not operations user'
      });
    }
  });
};

ProductController.prototype.addProduct = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.operation == true) {
      if (!req.body.productName || !req.body.contactName || !req.body.contactNumber1) {
        return res.status(422).send({
          success: false,
          message: 'Check parameters!'
        });
      }
      var opsRef = req.decoded._doc._id;
      Product.findOne({
        productName: req.body.productName
      }, function(err, product) {
        if (err) {
          return res.json(err);
        } else if (product) {
          res.json({
            success: false,
            message: 'product already exists'
          });
        } else {
          req.body.opsRef = opsRef;
          Product.create(req.body, function(err, product) {
            if (err) {
              return res.json(err);
            }
            return res.json(product);
          });
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not operations user'
      });
    }
  });
};

ProductController.prototype.deleteAll = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.operation == true) {
      Product.remove(function(err, products) {
        if (err) {
          return res.json(err);
        }
        ProductController.prototype.getProducts(req, res);
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not operations user'
      });
    }
  });
};

ProductController.prototype.deleteProduct = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.operation == true) {
      var productId = req.params.product_id;
      Product.remove({
        _id: productId
      }, function(err, product) {
        if (err) {
          return res.json(err);
        }
        return res.json({
          success: true,
          message: "product has been deleted"
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not operations user'
      });
    }
  });
};

ProductController.prototype.updateProduct = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.operation == true) {
      var opsRef = req.decoded._doc._id;
      var productId = req.params.product_id;
      var newProduct = req.body;
      Product.findByIdAndUpdate({
        _id: productId
      }, req.body, {
        new: true
      }, function(err, product) {
        if (err) {
          return res.json(err);
        }
        return res.json({
          product: product
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not operations user'
      });
    }
  });
};

ProductController.prototype.getProduct = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.operation == true) {
      var productId = req.params.product_id;
      Product.find({
        _id: productId
      }, function(err, product) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(product);
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not operations user'
      });
    }
  });
};

module.exports = ProductController;
