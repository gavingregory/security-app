angular.module('logApp')
  .controller('eventListCtrl', ['$scope', 'eventFactory', function ($scope, eventFactory) {

    eventFactory.list().then(function(resp){
      $scope.events = resp.data;
    }). catch( function( err ){
      console.log(err);
    });
  }]);
