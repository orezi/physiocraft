"use strict";
angular.module("physiocraft")
  .controller("patientCtrl", ["$scope", "$location", "$mdDialog", "$state", "$mdToast", "$stateParams", "UserService", "PatientService", function($scope, $location, $mdDialog, $state, $mdToast, $stateParams, UserService, PatientService) {
    
    $scope.getPatientTreatments = function(){
      PatientService.getPatientTreatments($stateParams.patient_id).success(function(res) {
        $scope.treatments = res;
      });
    };

    if (!localStorage.getItem('userToken')) {
      $state.go('landingpage.login');
    } else {
      $scope.getPatientTreatments();
    }

    $scope.getPatient = function() {
      PatientService.getCurrentPatient($stateParams.patient_id).success(function(res) {
        $scope.patient = res;
      });
    }

    $scope.selected = [];

    $scope.createPatient = function(newPatient){
      PatientService.createPatient(newPatient).success(function(data){
        $state.go('nav.adminPatient');
      });
    }

    $scope.openAddTreatment = function(patientId){
      $state.go('nav.addPatientTreatment', {patient_id: patientId});
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.createTreatment = function(treatmentObj){
      PatientService.addTreatment(treatmentObj, $stateParams.patient_id).success(function(data){
        $state.go('nav.patientDetails', {patient_id: $stateParams.patient_id});
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
    };

    $scope.openTreatmentDetails = function(patientId, treatmentId){
      $state.go('nav.treatmentDetails', {
        treatment_id: treatmentId,
        patient_id: patientId
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.openPatientDetailsView = function(patientId){
      $state.go('nav.patientDetails', {
        patient_id: patientId
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.deleteTreatment = function(id){
      PatientService.deleteTreatment(id).success(function(data){
        $scope.getPatientTreatments();
      });
    };

    $scope.getTreatment = function(){
      PatientService.getTreatment($stateParams.treatment_id).success(function(data){
        $scope.treatment = data
      });
    };

    $scope.updateTreatmentDetails = function(id, updatedTreatment){
      PatientService.updateTreatment(id, updatedTreatment);
    };

    $scope.updatePatientDetails = function(id, updatedPatient){
      PatientService.updatePatient(id, updatedPatient);
    };

    $scope.showConfirm = function(ev, id) {
      var confirm = $mdDialog.confirm()
        .title("Delete Treatment")
        .content("Are you sure you want to delete this treatment?.")
        .ariaLabel("Lucky day")
        .targetEvent(ev)
        .ok("Yes!")
        .cancel("No");
      $mdDialog.show(confirm).then(function() {
        $scope.deleteTreatment(id);
      });
    };

    $scope.logout = function() {
      localStorage.removeItem('userToken');
      $location.url('/home/login');
    };
  }]);
