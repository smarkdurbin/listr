'use strict';

describe('Controller: ListsCtrl', function () {

  // load the controller's module
  beforeEach(module('listrApp'));

  var ListsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListsCtrl = $controller('ListsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
