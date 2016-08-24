"use strict";
angular.module("physiocraft")
  .controller("adminCtrl", ["$scope", "$location", "$mdDialog", "$mdToast", "$state", "$stateParams", "UserService", "PatientService", function($scope, $location, $mdDialog, $mdToast, $state, $stateParams, UserService, PatientService) {

    if (!localStorage.getItem('userToken')) {
      $state.go('landingpage.login');
    } else {
      UserService.getCurrentUser().success(function(res) {
        $scope.user = res;
      });

    }
    $scope.getAllPatients = function() {
      PatientService.getAllPatients().success(function(res) {
        $scope.patients = res;
      });
    }
    
    $scope.openPatientDetails = function(patientId){
      $state.go('nav.patientDetails', {patient_id: patientId});
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.selected = [];

    $scope.deletePatient = function(id){
      PatientService.deletePatient(id).success(function(data){
        $scope.getAllPatients();
      });
    };

    $scope.showConfirm = function(ev, id) {
      var confirm = $mdDialog.confirm()
        .title("Delete Patient")
        .content("Are you sure you want to delete this patient?.")
        .ariaLabel("Lucky day")
        .targetEvent(ev)
        .ok("Yes!")
        .cancel("No");
      $mdDialog.show(confirm).then(function() {
        $scope.deletePatient(id);
      });
    };
    
    $scope.logout = function() {
      localStorage.removeItem('userToken');
      $location.url('/home/login');
    };
  }]);
