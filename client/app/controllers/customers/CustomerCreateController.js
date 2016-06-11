(function(){
  'use strict';

  angular
       .module('app')
       .controller('CustomerCreateController', [
          '$log', '$state', 'customerFactory', 'toastFactory',
          CustomerCreateController
       ]);

  function CustomerCreateController($log, $state, customerFactory, toastFactory) {
    var vm = this;

    vm.customer = {};
    vm.create = _create;

    function _create(customer) {
      customerFactory.create(customer)
        .then(function (resp) {
          $state.go('home.customers');
        })
        .catch(function (resp) {
          toastFactory.showSimpleToast('Error creating customer');
        });
    };

  };

})();
