angular.module('logApp')
  .controller('eventCreateController', ['$window', '$scope', 'eventFactory', 'siteFactory', function ($window, $scope, eventFactory, siteFactory) {
    $scope.sites = [];

    $scope.event = {};

    siteFactory.list().then(function(resp){
      $scope.sites = resp.data;
    });

    $scope.createEvent = function(event) {
      eventFactory.create(event).then(function(resp){
        $window.location.href = "/#/event";
        console.log(resp);
      })
      .catch(function(err){
        console.log(err);
      })
    }
  }]);
