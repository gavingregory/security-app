(function(){
  'use strict';

  angular
       .module('app')
       .controller('CustomerEditController', [
          '$stateParams', 'customerFactory', 'toastFactory', 'pageStateFactory',
          CustomerEditController
       ]);

  function CustomerEditController($stateParams, customerFactory, toastFactory, pageStateFactory) {
    var vm = this;
    vm.customer = {};
    vm.update = _update;
    vm.crudState = new pageStateFactory.crudState('update');

    customerFactory.get($stateParams.customer_id)
      .then(function (res) {
        vm.customer = res.data;
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fetching your customer.');
      });

    function _update(customer) {
      console.log('update fn fired')
      customerFactory.update(customer)
        .then(function (resp) {
          toastFactory.showSimpleToast('Success, customer updated.');
        })
        .catch(function (resp) {
          toastFactory.showSimpleToast('Error creating customer');
        });
    };
  };

})();
