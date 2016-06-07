angular.module('logApp')
  .controller('eventListCtrl', ['$scope', 'eventFactory', function ($scope, eventFactory) {

    $scope.events = eventFactory.list();


  }]);
