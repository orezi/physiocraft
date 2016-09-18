'use strict';
require('../models/user.model');
require('../models/media.model');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Media = mongoose.model('Media');
var config = require('../../config/db');

var MeidaController = function() {}

MeidaController.prototype.getAllMedia = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.e_media == true) {
      Media.find(function(err, medias) {
        if (err) {
          return res.json(err);
        }
        if (!medias) {
          return res.json({
            success: false,
            message: 'No medias found'
          });
        }
        return res.json(medias);
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not e_media user'
      });
    }
  });
};

MeidaController.prototype.addMedia = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.e_media == true) {
      if (!req.body.mediaName || !req.body.content) {
        return res.status(422).send({
          success: false,
          message: 'Check parameters!'
        });
      }
      Media.findOne({
        mediaName: req.body.mediaName
      }, function(err, media) {
        if (err) {
          return res.json(err);
        } else if (media) {
          res.json({
            success: false,
            message: 'This already exists'
          });
        } else {
          Media.create(req.body, function(err, media) {
            if (err) {
              return res.json(err);
            }
            return res.json(user);
          });
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not e_media user'
      });
    }
  });
};

MeidaController.prototype.deleteAll = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.e_media == true) {
      Media.remove(function(err, medias) {
        if (err) {
          return res.json(err);
        }
        MeidaController.prototype.getAllMedia(req, res);
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not e_media user'
      });
    }
  });
};

MeidaController.prototype.deleteMedia = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.e_media == true) {
      var mediaId = req.params.media_id;
      Media.remove({
        _id: mediaId
      }, function(err, media) {
        if (err) {
          return res.json(err);
        }
        return res.json({
          success: true,
          message: "media has been deleted"
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not e_media user'
      });
    }
  });
};

MeidaController.prototype.updateMedia = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.e_media == true) {
      var mediaId = req.params.media_id;
      var newMedia = req.body;
      Media.findByIdAndUpdate({
        _id: mediaId
      }, req.body, {
        new: true
      }, function(err, media) {
        if (err) {
          return res.json(err);
        }
        return res.json({
          media: media
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not e_media user'
      });
    }
  });
};

MeidaController.prototype.getMedia = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.e_media == true) {
      var mediaId = req.params.media_id;
      Media.find({
        _id: mediaId
      }, function(err, media) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(media);
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not e_media user'
      });
    }
  });
};

module.exports = MeidaController;
