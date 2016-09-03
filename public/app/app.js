"use strict";
// public/app/app.js
angular.module('physiocraft', ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'md.data.table'])
  .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    var customMap = $mdThemingProvider.extendPalette('light-blue', {
      '50': '5A8DEB',
      '100': 'EBEEF3',
      '200': '0159A2',
      '500': 'f44336'
    });

    $mdThemingProvider.definePalette('custom', customMap);
    
    $mdThemingProvider.theme('default')
      .primaryPalette('custom', {
        'default': '500',
        'hue-1': '50',
        'hue-2': '100',
        'hue-3': '200'
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
      .state('nav.adminPatient', {
        url: '/patients',
        templateUrl: 'app/views/admin.patient.html',
        controller: 'adminCtrl'
      })
      .state('nav.addPatient', {
        url: '/newPatient',
        templateUrl: 'app/views/add.patient.html',
        controller: 'patientCtrl'
      })
      .state('nav.addPatientTreatment', {
        url: '/patient/:patient_id/newTreatment',
        templateUrl: 'app/views/add.patient.treatment.html',
        controller: 'patientCtrl'
      })
      .state('nav.treatmentDetails', {
        url: '/patient/:patient_id/treatment/:treatment_id',
        templateUrl: 'app/views/treatment.details.html',
        controller: 'patientCtrl'
      })
      .state('nav.user', {
        url: '/user/:user_id',
        templateUrl: 'app/views/user.account.html',
        controller: 'homeCtrl'
      })
      .state('nav.physios', {
        url: '/physios',
        templateUrl: 'app/views/physios.html',
        controller: 'adminCtrl'
      })
      .state('nav.pendingPhysioDetails', {
        url: '/physioDetails/:physio_id',
        templateUrl: 'app/views/pending.physio.details.html',
        controller: 'adminCtrl'
      })
      .state('nav.patientDetails', {
        url: '/patient/:patient_id',
        templateUrl: 'app/views/patient.details.html',
        controller: 'patientCtrl'
      })
      .state('nav.products', {
        url: '/products',
        templateUrl: 'app/views/products.html',
        controller: 'productCtrl'
      })
      .state('nav.addProduct', {
        url: '/newProduct',
        templateUrl: 'app/views/add.product.html',
        controller: 'productCtrl'
      })
      .state('nav.productDetails', {
        url: '/product/:product_id',
        templateUrl: 'app/views/product.details.html',
        controller: 'productCtrl'
      })
      .state('nav', {
        url: '/nav',
        templateUrl: 'app/views/nav.html',
        controller: 'adminCtrl'
      });
    $urlRouterProvider.otherwise('/home/login');
  });
