angular.module('logApp')
  .controller('eventListCtrl', ['$scope', 'eventFactory', function ($scope, eventFactory) {


    eventFactory.list().then(function(data){
      $scope.events = data;
    }). catch( function( err ){
      console.log(err);
    });
  }]);
