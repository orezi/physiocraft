"use strict";
var express = require('express');
var router = express.Router();
var SourceController = require('../controllers/source.controller');
var source = new SourceController();
var UserController = require('../controllers/user.controller');
var user = new UserController();

module.exports = function(app) {
  //define routes with functions
  router.route('/sources')
    .get(user.verifyToken, source.getSources)
    .post(user.verifyToken, source.addSource)
    .delete(user.verifyToken, source.deleteAll);

  router.route('/source/:source_id')
    .get(user.verifyToken, source.getSource)
    .put(user.verifyToken, source.updateSource)
    .delete(user.verifyToken, source.deleteSource);

  app.use('/api', router);
  // frontend routes =========================================================
};