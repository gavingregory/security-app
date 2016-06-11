angular.module('logApp')
  .controller('customerListController', ['$scope', 'customerFactory', function ($scope, customerFactory) {
    $scope.customers = [];
    customerFactory.list()
      .then(function (res) {
        $scope.customers = res.data;
      })
  }]);
