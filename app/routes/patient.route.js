"use strict";
var express = require('express');
var router = express.Router();
var PatientController = require('../controllers/patient.controller');
var patient = new PatientController();
var UserController = require('../controllers/user.controller');
var user = new UserController();

module.exports = function(app) {
  //define routes with functions
  router.route('/patients')
    .get(user.verifyToken, patient.getPatients)
    .post(user.verifyToken, patient.addPatient)
    .delete(patient.deleteAll);

  router.route('/patient/:patient_id')
    .put(user.verifyToken, patient.updatePatient)
    .get(user.verifyToken, patient.getPatient)
    .delete(user.verifyToken, patient.deletePatient);

  app.use('/api', router);
  // frontend routes =========================================================
};