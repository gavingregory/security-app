(function(){
  'use strict';

  angular
  .module('app')
  .controller('CustomerCreateController', [
    '$log', '$state', 'customerFactory', 'toastFactory', 'pageStateFactory',
    CustomerCreateController
  ]);

  function CustomerCreateController($log, $state, customerFactory, toastFactory, pageStateFactory) {
    var vm = this;
    vm.customer = {};
    vm.create = _create;
    vm.crudState = new pageStateFactory.crudState('create');

    function _create(customer) {
      customerFactory.create(customer)
        .then(function (resp) {
          $state.go('home.customers.list');
        })
        .catch(function (resp) {
          toastFactory.showSimpleToast('Error creating customer');
        });
    };
  };

})();
