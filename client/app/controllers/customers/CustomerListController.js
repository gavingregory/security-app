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
