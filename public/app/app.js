"use strict";
// public/app/app.js
angular.module('physiocraft', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria'])
  .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    var customMap = $mdThemingProvider.extendPalette('light-blue', {
      '50': 'ffebee',
      '100': '3E313C',
      '500': 'f44336',
      'contrastDefaultColor': 'light'
    });

    $mdThemingProvider.definePalette('custom', customMap);
    
    $mdThemingProvider.theme('default')
      .primaryPalette('custom', {
        'default': '500',
        'hue-1': '50',
        'hue-2': '100'
      });

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
      })
      .state('nav', {
        url: '/nav',
        templateUrl: 'app/views/nav.html',
        controller: 'adminCtrl'
      });
    $urlRouterProvider.otherwise('/home/login');
  });
