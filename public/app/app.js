"use strict";
// public/app/app.js
angular.module('physiocraft', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('landingpage', {
        url: '/home',
        templateUrl: 'app/views/home.html',
        controller: 'homeCtrl'
      })
      .state('landingpage.login', {
        url: '/login',
        templateUrl: 'app/views/login.html',
        controller: 'homeCtrl'
      })
      .state('landingpage.signup', {
        url: '/signup',
        templateUrl: 'app/views/signup.html',
        controller: 'homeCtrl'
      });
    $urlRouterProvider.otherwise('/home/login');
  });
