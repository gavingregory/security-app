angular.module('logApp')
  .controller('customerListCtrl', ['$scope', 'customerFactory', function ($scope, customerFactory) {
    $scope.customers = [];
    customerFactory.list()
      .then(function (res) {
        $scope.customers = res.data;
      })
  }]);
