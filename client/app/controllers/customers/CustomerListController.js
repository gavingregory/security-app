angular.module('logApp')
  .controller('CustomerListController', ['$scope', 'customerFactory', function ($scope, customerFactory) {
    $scope.customers = [];
    customerFactory.list()
      .then(function (res) {
        $scope.customers = res.data;
      })
  }]);
