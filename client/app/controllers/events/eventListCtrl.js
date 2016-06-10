angular.module('logApp')
  .controller('eventListCtrl', ['$scope', 'eventFactory', 'socket', function ($scope, eventFactory, socket ) {

    eventFactory.list().then(function(resp){
      $scope.events = resp.data;
    }). catch( function( err ){
      console.log(err);
    });
    $scope.$on('socket:error', function (ev, data) {
      console.log(ev);
      console.log(data);
    });
    $scope.$on('socket:connection', function(socket){
      console.log('a event user connected');
    });
  }]);
