angular.module('logApp')
  .controller('CategoryListController', ['$scope', 'categoryFactory', function ($scope, categoryFactory ) {

    categoryFactory.list().then(function(resp){
      $scope.categories = resp.data;
      console.log($scope.categories);
    }). catch( function( err ){
      console.log(err);
    });
  }]);
