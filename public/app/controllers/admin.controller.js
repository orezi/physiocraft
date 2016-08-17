"use strict";
angular.module("physiocraft")
  .controller("adminCtrl", ["$scope", "$location", "$mdToast", "$stateParams", "UserService", function($scope, $location, $mdToast, $stateParams, UserService) {
    
    if (!localStorage.getItem('userToken')) {
      $location.url('/home/login');
    } else {
      UserService.getCurrentUser().success(function(res) {
        $scope.user = res;
      });
    }

    $scope.logout = function() {
      localStorage.removeItem('userToken');
      $location.url('/home/login');
    };
  }]);
