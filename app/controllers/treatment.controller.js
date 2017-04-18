'use strict';
require('../models/user.model');
require('../models/patient.model');
require('../models/treatment.model');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Patient = mongoose.model('Patient');
var Treatment = mongoose.model('Treatment');
var config = require('../../config/db');

var TreatmentController = function() {}

TreatmentController.prototype.getAllTreatments = function(req, res) {
  Treatment.find(function(err, treatments) {
    if (err) {
      return res.json(err);
    }
    if (!treatments) {
      return res.json({
        success: false,
        message: 'No treatments found'
      });
    }
    return res.json(treatments);
  });
};

TreatmentController.prototype.getPatientTreatments = function(req, res) {
  var patientId = req.params.patientId;
  Treatment.find({
    patientRef: patientId
  })
  .populate('physioRef','firstname')
  .exec(function(err, treatments) {
    if(err) {
      return res.status(500).send(err);
    }
    res.json(treatments);
  });
};

TreatmentController.prototype.getPhysioPatientTreatments = function(req, res) {
  var patientId = req.params.patientId;
  var physioId = req.params.physioId;
  Treatment.find({
    patientRef: patientId,
    physioRef: physioId
  }, function(err, treatments) {
    if (err) {
      return res.json(err)
    }
    return res.json(treatments);
  });
};

TreatmentController.prototype.addTreatment = function(req, res) {
  if (!req.body.history || !req.body.treatmentDetails || !req.body.duration) {
    return res.status(422).send({
      success: false,
      message: 'Check parameters!'
    });
  }
  var physioRef = req.decoded._doc._id;
  var patientRef = req.params.patientId;
  req.body.physioRef = physioRef;
  req.body.patientRef = patientRef;
  Treatment.create(req.body, function(err, treatment) {
    if (err) {
      return res.json(err);
    }
    return res.json(treatment);
  });
};

TreatmentController.prototype.deleteTreatment = function(req, res) {
  var treatmentId = req.params.treatmentId;
  Treatment.remove({
    _id: treatmentId
  }, function(err, treatment) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      success: true,
      message: "Treatment has been deleted"
    });
  });
}

TreatmentController.prototype.updateTreatment = function(req, res) {
  var physioRef = req.decoded._doc._id;
  var treatmentId = req.params.treatmentId;
  req.body.physioRef = physioRef;
  Treatment.findByIdAndUpdate({
    _id: treatmentId
  }, req.body, {
    new: true
  }, function(err, treatment) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      treatment: treatment
    });
  });
};

TreatmentController.prototype.getTreatment = function(req, res) {
  var treatmentId = req.params.treatmentId;
  Treatment.find({
    _id: treatmentId
  })
  .populate('physioRef','firstname')
  .exec(function(err, treatments) {
    if(err) {
      return res.status(500).send(err);
    }
    res.json(treatments);
  });
};

module.exports = TreatmentController;
