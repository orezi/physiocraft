'use strict';
require('../models/user.model');
require('../models/patient.model');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Patient = mongoose.model('Patient');
var config = require('../../config/db');

var PatientController = function() {}

PatientController.prototype.getPatients = function(req, res) {
  Patient.find(function(err, patients) {
    if (err) {
      return res.json(err);
    }
    if (!patients) {
      return res.json({
        success: false,
        message: 'No patients found'
      });
    }
    return res.json(patients);
  });
};

PatientController.prototype.addPatient = function(req, res) {
  if (!req.body.firstname || !req.body.lastname || !req.body.email) {
    return res.status(422).send({
      success: false,
      message: 'Check parameters!'
    });
  }
  var physioRef = req.decoded._doc._id;
  Patient.findOne({
    email: req.body.email
  }, function(err, patient) {
    if (err) {
      return res.json(err);
    } else if (patient) {
      res.json({
        success: false,
        message: 'patient email taken'
      });
    } else {
      req.body.physioRef = physioRef;
      Patient.create(req.body, function(err, patient) {
        if (err) {
          return res.json(err);
        }
        return res.json(patient);
      });
    }
  });
};

PatientController.prototype.deleteAll = function(req, res) {
  Patient.remove(function(err, patients) {
    if (err) {
      return res.json(err);
    }
    PatientController.prototype.getPatients(req, res);
  });
};

PatientController.prototype.deletePatient = function(req, res) {
  var patientId = req.params.patient_id;
  Patient.remove({
    _id: patientId
  }, function(err, patient) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      success: true,
      message: "patient has been deleted"
    });
  });
}

PatientController.prototype.updatePatient = function(req, res) {
  var physioRef = req.decoded._doc._id;
  var patientId = req.params.patient_id;
  var newPatient = req.body;
  Patient.findByIdAndUpdate({
    _id: patientId
  }, req.body, {
    new: true
  }, function(err, patient) {
    if (err) {
      return res.json(err);
    }
    return res.json({
      patient: patient
    });
  });
};

PatientController.prototype.getPatient = function(req, res) {
  var patientId = req.params.patient_id;
  Patient.find({
      _id: patientId
    })
    .populate('physioRef', 'firstname')
    .exec(function(err, patient) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(patient);
    });
};

module.exports = PatientController;
