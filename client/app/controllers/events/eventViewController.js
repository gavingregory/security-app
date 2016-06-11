angular.module('logApp')
  .controller('eventViewController', ['$scope', '$routeParams', 'eventFactory', function ($scope, $routeParams, eventFactory) {
    $scope.event = {};
    $scope.params = $routeParams;
    eventFactory.get($routeParams.id).then(function(resp){
      $scope.event = resp.data;
    });

  }]);
