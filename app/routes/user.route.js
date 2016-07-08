"use strict";
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user.controller');
var user = new UserController();

module.exports = function(app) {
  //define routes with functions
  router.route('/users')
    .get(user.getUsers)
    .post(user.createUser)
    .delete(user.deleteAll);

  router.route('/authenticate')
    .post(user.authenticate);

  router.route('/decode')
    .get(user.verifyToken, user.decodeUser);

  router.route('/mail')
    .post(user.adminConfirmMail);

  router.route('/verify/:user_id')
    .post(user.confirmUser);

  router.route('/user')
    .put(user.verifyToken, user.updateUser)
    .get(user.verifyToken, user.getCurrentUser)
    .delete(user.verifyToken, user.deleteUser);

  app.use('/api', router);
  // frontend routes =========================================================
};
