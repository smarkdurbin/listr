'use strict';

angular.module('listrApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lists', {
        url: '/lists',
        templateUrl: 'app/lists/lists.html',
        controller: 'ListsCtrl'
      });
  });