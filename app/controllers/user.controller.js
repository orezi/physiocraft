'use strict';
require('../models/user.model');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var config = require('../../config/db');
var session = ('express-session');
var nodemailer = require('nodemailer');

var UserController = function() {}

UserController.prototype.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      return res.json(err);
    }
    if (!users) {
      return res.json({
        success: false,
        message: 'No users found'
      });
    }
    return res.json(users);
  });
};

UserController.prototype.createUser = function(req, res) {
  if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
    return res.status(422).send({
      success: false,
      message: 'Check parameters!'
    });
  }
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
      return res.json(err);
    } else if (user) {
      res.json({
        success: false,
        message: 'user email taken'
      });
    } else {
      User.create(req.body, function(err, user) {
        if (err) {
          return res.json(err);
        }
        UserController.prototype.adminConfirmMail(req, res);
        return res.json(user);
      });
    }
  });
};

UserController.prototype.adminConfirmMail = function(req, res) {
  User.find({
    admin: true
  }, function(err, user) {
    if (err) {
      return res.json(err);
    }
    if (user) {
      console.log("user", user[0]);
      var user = user[0];
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'sdkd@gmail.com',
          pass: 'dsklds'
        }
      });
      var mailOptions = {
        from: 'Physiocraft ✔ <no-reply@physiocraft.com>',
        to: user.email,
        subject: 'Confirm registration of new physio',
        text: 'There is a new physio to be confirmed',
        html: '<b> Hello ' + user.firstname + ',\n A new user has requested to be a physiotherapist \n' +
          'Click <a href="https://www.youtube.com/watch?v=wulMdCsgDBA"> here</a> to confirm user details</b>'
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('message sent: ' + info);
        }
      });
    }
  });
};

UserController.prototype.confirmUser = function(req, res) {
  var pendingUserId = req.params.user_id;
  User.findByIdAndUpdate(pendingUserId, { $set: { verified: true } }, function(err, user) {
    if (err) return err;
    res.send({
      success: true,
      message: "User verified",
      user: user
    });
  });
};

UserController.prototype.deleteAll = function(req, res) {
  User.remove(function(err, users) {
    if (err) {
      return res.json(err);
    }
    UserController.prototype.getUsers(req, res);
  });
};

UserController.prototype.deleteUser = function(req, res) {
  User.remove({
    _id: req.decoded._doc._id
  }, function(err, user) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      success: true,
      message: "user has been deleted"
    });
  });
}

UserController.prototype.updateUser = function(req, res) {
  User.findByIdAndUpdate({
    _id: req.decoded._doc._id
  }, req.body, {
    new: true
  }, function(err, user) {
    if (err) {
      return res.json(err);
    }
    var token = jwt.sign(user, config.secret, {
      expiresIn: 34560 //24hr expiration
    });

    return res.json({
      user: user,
      token: token
    });
  });
}

UserController.prototype.getUserFromToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        next();
      } else {
        //if all checks are passed, save decoded info to request
        req.user = decoded;
        next();
      }
    });
  } else {
    next();
  }
};

UserController.prototype.decodeUser = function(req, res) {
  return res.json(req.decoded);
};

UserController.prototype.verifyToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.body.newPatient.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        //if all checks are passed, save decoded info to request
        req.decoded = decoded;
        next();
      }
    });
  } else {
    //show http 403 message when token is not provided
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};

UserController.prototype.authenticate = function(req, res) {
  User.findOne({
    email: req.body.email,
    verified: true
  }).exec(function(err, user) {
    if (err)
      return res.json(err);

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found or not confirmed.'
      });
    } else if (req.body.password) {
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {
        var token = jwt.sign(user, config.secret, {
          expiresIn: 34560 //24hr expiration
        });
        //return info including token in JSON format
        return res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }
    } else {
      return;
    }
  });
};

UserController.prototype.getCurrentUser = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(user);
    }
  });
};

UserController.prototype.makeOperation = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.admin == false) {
      return res.json({
        success: false,
        message: "not authorized"
      });
    }
    else {
      User.findByIdAndUpdate(req.params.id, {
        $set: {
          operation: true,
          finance: false,
          marketing: false,
          e_media: false,
          associate: false
        }
      }, function(err, user) {
        if (err) return (err);
        res.send(user);
      });
    }
  });
};

UserController.prototype.makeFinance = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.admin == false) {
      return res.json({
        success: false,
        message: "not authorized"
      });
    }
    else {
      User.findByIdAndUpdate(req.params.id, {
        $set: {
          finance: true,
          operation: false,
          marketing: false,
          e_media: false,
          associate: false
        }
      }, function(err, user) {
        if (err) return (err);
        res.send(user);
      });
    }
  });
};

UserController.prototype.makeMarketing = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.admin == false) {
      return res.json({
        success: false,
        message: "not authorized"
      });
    }
    else {
      User.findByIdAndUpdate(req.params.id, {
        $set: {
          marketing: true,
          finance: false,
          operation: false,
          e_media: false,
          associate: false
        }
      }, function(err, user) {
        if (err) return (err);
        res.send(user);
      });
    }
  });
};

UserController.prototype.makeEMedia = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.admin == false) {
      return res.json({
        success: false,
        message: "not authorized"
      });
    }
    else {
      User.findByIdAndUpdate(req.params.id, {
        $set: {
          e_media: true,
          finance: false,
          operation: false,
          marketing: false,
          associate: false
        }
      }, function(err, user) {
        if (err) return (err);
        res.send(user);
      });
    }
  });
};

UserController.prototype.makeAssociate = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.admin == false) {
      return res.json({
        success: false,
        message: "not authorized"
      });
    }
    else {
      User.findByIdAndUpdate(req.params.id, {
        $set: {
          associate: true,
          finance: false,
          operation: false,
          marketing: false,
          e_media: false,
        }
      }, function(err, user) {
        if (err) return (err);
        res.send(user);
      });
    }
  });
};

UserController.prototype.makeFounder = function(req, res) {
  User.findById(req.decoded._doc._id, function(err, user) {
    if (user.admin == false) {
      return res.json({
        success: false,
        message: "not authorized"
      });
    }
    else {
      User.findByIdAndUpdate(req.params.id, {
        $set: {
          associate: true,
          finance: true,
          operation: true,
          marketing: true,
          e_media: true,
        }
      }, function(err, user) {
        if (err) return (err);
        res.send(user);
      });
    }
  });
};

module.exports = UserController;
