'use strict';

angular.module('listrApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [

                  ];
    
    $scope.authMenu = [      
/*                    {
                        'title': 'Dashboard',
                        'link': '/dashboard'
                    },*/
                    {
                        'title': 'My Lists',
                        'link': '/lists'
                    }
                       ];
    

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    if($scope.isLoggedIn() === true){
        $scope.menu = $scope.menu.concat($scope.authMenu);   
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });