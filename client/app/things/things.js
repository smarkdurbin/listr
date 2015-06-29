'use strict';

angular.module('listrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('things', {
        url: '/things',
        templateUrl: 'app/things/things.html',
        controller: 'ThingsCtrl'
      });
  });