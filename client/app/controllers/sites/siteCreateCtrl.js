angular.module('logApp')
  .controller('siteCreateCtrl', ['$scope', 'siteFactory', 'customerFactory', function ($scope, siteFactory, customerFactory) {
    $scope.customers = [];

    $scope.site = [];

    customerFactory.list().then(function(data){
      $scope.customers = data;
    });

    $scope.createSite = function(site) {
      siteFactory.create().then(function(data, err){
        if (err) console.log(err)
        else window.location.href = "/#/sites";
      })
    }
  }]);
