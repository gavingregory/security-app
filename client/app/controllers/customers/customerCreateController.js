angular.module('logApp')
  .controller('customerCreateController', ['$window', '$scope', 'customerFactory', function ($window, $scope, customerFactory) {
    $scope.customer = {};
    $scope.createCustomer = function (customer) {
      customerFactory.create(customer)
        .then(function (data) {
          $window.location.href='/#/customers';
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }]);
