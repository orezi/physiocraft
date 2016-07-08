"use strict";
// public/js/app.js
angular.module('defaultApp', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('landingpage', {
        url: '/home',
        templateUrl: '../views/home.html'
      })
      .state('secondpage', {
        url: '/second',
        templateUrl: '../views/secondpage.html'
      });

    $urlRouterProvider.otherwise('/home');
  });
