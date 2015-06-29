'use strict';

angular.module('listrApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
                    {
                        'title': 'Dashboard',
                        'link': '/dashboard'
                    },
                    {
                        'title': 'My Lists',
                        'link': '/lists'
                    }
                  ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });