"use strict";
angular.module("physiocraft")
  .controller("sourceCtrl", ["$scope", "$mdDialog", "$state", "$location", "$mdToast", "$stateParams", "UserService", "SourceService", function($scope, $mdDialog, $state, $location, $mdToast, $stateParams, UserService, SourceService) {
    if (!localStorage.getItem('userToken')) {
      $state.go('landingpage.login');
    } else {
      SourceService.getAllSources().success(function(res) {
        $scope.sources = res;
      });
    }
    $scope.getAllSources = function(){
      SourceService.getAllSources().success(function(res) {
        $scope.sources = res;
      });
    };

    $scope.getSource = function() {
      SourceService.getSource($stateParams.source_id).success(function(res) {
        $scope.source = res;
      });
    }

    $scope.createSource = function(newSource){
      SourceService.createSource(newSource).success(function(data){
        $state.go('nav.sources');
      });
    };

    $scope.deleteSource = function(id){
      SourceService.deleteSource(id).success(function(data){
        $scope.getAllSources();
      });
    };

    $scope.openSourceDetailsView = function(sourceId){
      $state.go('nav.sourceDetails', {
        source_id: sourceId
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    };

    $scope.updateSourceDetails = function(id, updatedSource){
      SourceService.updateSource(id, updatedSource);
    };

    $scope.showConfirm = function(ev, id) {
      var confirm = $mdDialog.confirm()
        .title("Delete Source")
        .content("Are you sure you want to delete this Source?.")
        .ariaLabel("Lucky day")
        .targetEvent(ev)
        .ok("Yes!")
        .cancel("No");
      $mdDialog.show(confirm).then(function() {
        $scope.deleteSource(id);
      });
    };

  }]);
