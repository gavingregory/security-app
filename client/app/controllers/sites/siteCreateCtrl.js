angular.module('logApp')
  .controller('siteCreateCtrl', ['$window', '$scope', 'siteFactory', 'customerFactory', function ($window, $scope, siteFactory, customerFactory) {
    $scope.customers = [];

    $scope.site = {};

    customerFactory.list().then(function(resp){
      $scope.customers = resp.data;
    });

    $scope.createSite = function(site) {
      siteFactory.create(site).then(function(resp){
        $window.location.href = "/#/sites";
        console.log(resp);
      })
      .catch(function(err){
        console.log(err);
      })
    }
  }]);
