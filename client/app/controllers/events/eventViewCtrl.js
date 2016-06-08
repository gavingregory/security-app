angular.module('logApp')
  .controller('eventViewCtrl', ['$scope', '$routeParams', 'eventFactory', function ($scope, $routeParams, eventFactory) {
    $scope.event = {};
    $scope.params = $routeParams;
    eventFactory.get($routeParams.id).then(function(resp){
      $scope.event = resp.data;
    });

  }]);
