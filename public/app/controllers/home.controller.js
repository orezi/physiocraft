"use strict";
angular.module("physiocraft")
  .controller("homeCtrl", ["$scope", "$location", "$mdToast", "$stateParams", "UserService", function($scope, $location, $mdToast, $stateParams, UserService) {
    //login a user
    $scope.loginUser = function(userData) {
      UserService.login(userData).then(function(res) {
        $scope.progressLoad = true;
        $scope.isLoggedIn = false;
        if (res.data.message === "Authentication failed. User not found or not confirmed.") {
          $mdToast.show(
            $mdToast.simple()
            .content("Username or password mismatch")
            .hideDelay(3000)
          );
          $scope.progressLoad = false;
          $scope.isLoggedIn = false;
        } else if (res.data.message === "Authentication failed. Wrong password.") {
          $mdToast.show(
            $mdToast.simple()
            .content("Username or password mismatch")
            .hideDelay(3000)
          );
          $scope.progressLoad = false;
          $scope.isLoggedIn = false;
        } else {
          //set token in localstorage
          localStorage.setItem("userToken", res.data.token);
          if (localStorage.getItem("userToken")) {
            $scope.userDetails = userData;
            $scope.response = res;
            $scope.progressLoad = false;
            $scope.isLoggedIn = true;
            $scope.userInformation = res.data.user;
            console.log("login success", res);
          }
        }
      });
    };
    $scope.physioTypes = ('Associate Finance Marketing E-media Operation').split(' ').map(function (physioType) { return physioType; });

    //create a new user
    $scope.signUp = function(newUser) {
      $scope.progressLoad = true;
      $scope.isNewUser = false;
      UserService.createUser(newUser).then(function(res) {
        if (res.data.message === "user email taken") {
          $mdToast.show(
            $mdToast.simple()
            .content("Email already exists")
            .hideDelay(3000)
          );
        } else if (res.data.message === "Check parameters!") {
          $mdToast.show(
            $mdToast.simple()
            .content("Check for errors")
            .hideDelay(3000)
          );
        } else {
          $scope.userDetails = res;
          $scope.progressLoad = false;
          $scope.isNewUser = true;
          $mdToast.show(
            $mdToast.simple()
            .content("Please check your email for confirmation")
            .hideDelay(5000)
          ).then(function(){
            $location.url("/home/login");  
          });   
        }
      });
    };
  }]);
