angular.module('logApp')
  .controller('CategoryViewController', ['$scope', '$routeParams', 'categoryFactory', function ($scope, $routeParams, categoryFactory) {
    $scope.category = {};
    $scope.params = $routeParams;
    categoryFactory.get($routeParams.id).then(function(resp){
      $scope.category = resp.data;
    });

  }]);
