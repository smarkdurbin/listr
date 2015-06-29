'use strict';

angular.module('listrApp')
    .controller('ListsCtrl', function ($scope, $http, socket, Auth) {
    
        // AUTHENTICATION
    
        $scope.user = [];
    
        if(Auth.isLoggedIn()){
            console.log(Auth);
            $scope.user = Auth.getCurrentUser();
        }
    
    
        $scope.getLists = function() {
            $http.get('/api/lists').success(function(lists) {
                $scope.myLists = lists;
                socket.syncUpdates('list', $scope.myLists);
            });
        };
    
        $scope.getLists();
    
        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('list');
        });
    
        $scope.getList = function(listId) {
            $http.get('/api/lists/' + listId).success(function(list){
                
            });
        }
    
        $scope.createList = function() {
            if($scope.newList === '') {
                return
            };
            $http.post('/api/lists', { name: $scope.newList, owner: $scope.user._id }).success(function(){});
            $scope.newList = '';
        };
    
        $scope.newThing = [];
    
        $scope.addThing = function(listId, idx) {
            if($scope.newThing[idx] != '' && $scope.newThing[idx] != null) {
                $http.put('/api/lists/' + listId, {name: $scope.newThing[idx] }).success(function(){
                    $scope.newThing = [];
                });
            };
        };
    
        $scope.deleteThing = function(listId, thingId) {
            $http.put('/api/lists/' + listId, { thingId: thingId }).success(function(){
                
            });
        };
    
        $scope.completeThing = function(listId, thingId) {
            $http.put('/api/lists/' + listId, { complete: true, _id: thingId }).success(function(){
                
            });
        }
        
        $scope.uncompleteThing = function(listId, thingId) {
            $http.put('/api/lists/' + listId, { complete: false, _id: thingId }).success(function(){
                
            });
        }
        
        $scope.newDescription = [];
        
        $scope.addDescription = function(listId, idx) {
            if($scope.newDescription[idx] != '' && $scope.newDescription[idx] != null) {
                $http.put('/api/lists/' + listId, {description: $scope.newDescription[idx] }).success(function(){
                    $scope.newDescription = [];
                });
            };
        };
        
        $scope.myFilter = function (item) { 
            //console.log(item.parent_id) 
            return item
        };
    
        $scope.deleteList = function(listId) {
            if(listId) {
                $http.delete('/api/lists/' + listId).success(function(){
                    alert('done!');
                });
            }
        };
    });
