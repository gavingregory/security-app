(function(){
  'use strict';

  angular
       .module('app')
       .controller('CustomerEditController', [
          '$log', '$state', '$stateParams', 'customerFactory', 'toastFactory',
          CustomerEditController
       ]);

  function CustomerEditController($log, $state, $stateParams, customerFactory, toastFactory) {
    var vm = this;
    vm.customer = {};

    customerFactory.get($stateParams.customer_id)
      .then(function (res) {
        vm.customer = res.data;
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Unable to fetch customer');
      });
  };

})();
