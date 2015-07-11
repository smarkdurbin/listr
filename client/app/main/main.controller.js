'use strict';

angular.module('listrApp')
    .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    
        $scope.isLoggedIn = Auth.isLoggedIn;
    
        if(Auth.isLoggedIn()){
            $scope.user = Auth.getCurrentUser();
        }
    
    });
