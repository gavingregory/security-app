angular.module('logApp')
  .controller('CategoryListController', ['$scope', 'categoryFactory', function ($scope, categoryFactory ) {

    categoryFactory.list().then(function(resp){
      $scope.categories = resp.data;
    }). catch( function( err ){
      console.log(err);
    });
  }]);
