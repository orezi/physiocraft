"use strict";
var express = require('express');
var router = express.Router();
var TreatmentController = require('../controllers/treatment.controller');
var treatment = new TreatmentController();
var UserController = require('../controllers/user.controller');
var user = new UserController();

module.exports = function(app) {
  //define routes with functions
  router.route('/treatments')
    .get(user.verifyToken, treatment.getAllTreatments);

  router.route('/treatment/patient/:patientId')
    .post(user.verifyToken, treatment.addTreatment)
    .get(user.verifyToken, treatment.getPatientTreatments);

  router.route('/treatment/physio/:physioId/patient/:patientId')
    .get(user.verifyToken, treatment.getPhysioPatientTreatments);

  router.route('/treatment/:treatmentId')
    .put(user.verifyToken, treatment.updateTreatment)
    .get(user.verifyToken, treatment.getTreatment)
    .delete(user.verifyToken, treatment.deleteTreatment);

  app.use('/api', router);
  // frontend routes =========================================================
};