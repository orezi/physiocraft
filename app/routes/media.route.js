"use strict";
var express = require('express');
var router = express.Router();
var MediaController = require('../controllers/media.controller');
var media = new MediaController();
var UserController = require('../controllers/user.controller');
var user = new UserController();

module.exports = function(app) {
  //define routes with functions
  router.route('/media')
    .get(user.verifyToken, media.getAllMedia)
    .post(user.verifyToken, media.addMedia)
    .delete(user.verifyToken, media.deleteAll);

  router.route('/media/:media_id')
    .get(user.verifyToken, media.getMedia)
    .put(user.verifyToken, media.updateMedia)
    .delete(user.verifyToken, media.deleteMedia);

  app.use('/api', router);
  // frontend routes =========================================================
};