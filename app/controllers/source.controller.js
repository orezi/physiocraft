'use strict';
require('../models/user.model');
require('../models/source.model');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Source = mongoose.model('Source');
var config = require('../../config/db');

var SourceController = function() {}

SourceController.prototype.getSources = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.marketing == true) {
      Source.find(function(err, sources) {
        if (err) {
          return res.json(err);
        }
        if (!sources) {
          return res.json({
            success: false,
            message: 'No sources found'
          });
        }
        return res.json(sources);
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not marketing user'
      });
    }
  });
};

SourceController.prototype.addSource = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.marketing == true) {
      if (!req.body.sourceName || !req.body.sourceDescription || !req.body.sourceNumber1) {
        return res.status(422).send({
          success: false,
          message: 'Check parameters!'
        });
      }
      var marketingRef = req.decoded._doc._id;
      Source.findOne({
        sourceName: req.body.sourceName
      }, function(err, source) {
        if (err) {
          return res.json(err);
        } else if (source) {
          res.json({
            success: false,
            message: 'source already exists'
          });
        } else {
          req.body.marketingRef = marketingRef;
          Source.create(req.body, function(err, source) {
            if (err) {
              return res.json(err);
            }
            return res.json(source);
          });
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not marketing user'
      });
    }
  });
};

SourceController.prototype.deleteAll = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.marketing == true) {
      Source.remove(function(err, sources) {
        if (err) {
          return res.json(err);
        }
        SourceController.prototype.getSources(req, res);
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not marketing user'
      });
    }
  });
};

SourceController.prototype.deleteSource = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.marketing == true) {
      var sourceId = req.params.source_id;
      Source.remove({
        _id: sourceId
      }, function(err, source) {
        if (err) {
          return res.json(err);
        }
        return res.json({
          success: true,
          message: "Source has been deleted"
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not marketing user'
      });
    }
  });
};

SourceController.prototype.updateSource = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.marketing == true) {
      var marketingRef = req.decoded._doc._id;
      var sourceId = req.params.source_id;
      var newSource = req.body;
      Source.findByIdAndUpdate({
        _id: sourceId
      }, req.body, {
        new: true
      }, function(err, source) {
        if (err) {
          return res.json(err);
        }
        return res.json({
          source: source
        });
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not marketing user'
      });
    }
  });
};

SourceController.prototype.getSource = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.marketing == true) {
      var sourceId = req.params.source_id;
      Source.find({
        _id: sourceId
      }, function(err, source) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(source);
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Not marketing user'
      });
    }
  });
};

module.exports = SourceController;
