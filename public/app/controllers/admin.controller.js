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

    $scope.physioRole = 'None';
    $scope.physioTypes = ('None Associate Admin Finance Marketing E-media Operation').split(' ').map(function (physioType) { return physioType; });
    
    $scope.openPatientDetails = function(patientId){
      $state.go('nav.patientDetails', {patient_id: patientId});
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
    
    $scope.openPendingPhysioDetails = function(physioID){
      $state.go('nav.pendingPhysioDetails', {physio_id: physioID});
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.getPhysio = function(){
      UserService.getPhysio($stateParams.physio_id).success(function(res){
        $scope.physioDetail = res;
      });
    };

    $scope.assumeRole = function(id, physioRole) {
      switch (physioRole){
        case 'None':
          console.log("Choose option");
          break; 
        case 'Associate':
          UserService.makeAssociate(id).success(function(data){
            $state.go('nav.physios')
          });
          break;
        case 'Admin':
          UserService.makeAdmin(id).success(function(data){
            $state.go('nav.physios')
          });
          break;
        case 'Finance':
          UserService.makeFinance(id).success(function(data){
            $state.go('nav.physios')
          });
          break;
        case 'Marketing':
          UserService.makeMarketing(id).success(function(data){
            $state.go('nav.physios')
          });
          break;
        case 'E-media':
          UserService.makeEMedia(id).success(function(data){
            $state.go('nav.physios')
          });
          break;
        case 'Operation':
          UserService.makeOperation(id).success(function(data){
            $state.go('nav.physios')
          });
          break;
        default:
          console.log("Sorry, role not defined");
          $state.go('nav.physios')
      }
    };
    
    $scope.verifyPhysio = function(id, physioRole){
      UserService.verifyPhysio(id).success(function(data){
        $scope.assumeRole(id, physioRole);
      });
    };

    $scope.selected = [];

    $scope.deletePatient = function(id){
      PatientService.deletePatient(id).success(function(data){
        $scope.getAllPatients();
      });
    };

    $scope.deletePhysio = function(id){
      UserService.deletePhysio(id).success(function(data){
        $scope.getVerifiedUsers();
      });
    };

    $scope.deletePendingPhysio = function(id){
      UserService.deletePhysio(id).success(function(data){
        $scope.getPendingUsers();
      });
    };

    $scope.getPendingUsers = function(){
      UserService.getPendingUsers().success(function(data){
        $scope.pendingPhysios = data;
      });
    };

    $scope.getVerifiedUsers = function(){
      UserService.getVerifiedUsers().success(function(data){
        $scope.physios = data;
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

    $scope.showConfirmPhysio = function(ev, id) {
      var confirm = $mdDialog.confirm()
        .title("Delete Physio")
        .content("Are you sure you want to delete this physio?.")
        .ariaLabel("Lucky day")
        .targetEvent(ev)
        .ok("Yes!")
        .cancel("No");
      $mdDialog.show(confirm).then(function() {
        $scope.deletePhysio(id);
      });
    };

    $scope.showPendingPhysioConfirm = function(ev, id) {
      var confirm = $mdDialog.confirm()
        .title("Delete Physio")
        .content("Are you sure you want to delete this physio?.")
        .ariaLabel("Lucky day")
        .targetEvent(ev)
        .ok("Yes!")
        .cancel("No");
      $mdDialog.show(confirm).then(function() {
        $scope.deletePendingPhysio(id);
      });
    };
    
    $scope.logout = function() {
      localStorage.removeItem('userToken');
      $location.url('/home/login');
    };
  }]);
