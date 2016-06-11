angular.module('logApp')
  .controller('CustomerListController', ['$scope', 'customerFactory', function ($scope, customerFactory) {
    $scope.customers = [];
    customerFactory.list()
      .then(function (res) {
        $scope.customers = res.data;
      })
  }]);

(function(){
  'use strict';

  angular
       .module('app')
       .controller('CustomerListController', [
          '$log', '$state', 'customerFactory', 'toastFactory',
          CustomerListController
       ]);

  function CustomerListController($log, $state, customerFactory, toastFactory) {
    var vm = this;

    vm.customers = [];

    customerFactory.list()
      .then(function (res) {
        vm.customers = [].concat(res.data);
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fetching data!');
      });
  };

})();
