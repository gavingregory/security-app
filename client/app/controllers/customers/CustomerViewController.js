(function(){
  'use strict';

  angular
       .module('app')
       .controller('CustomerViewController', [
          '$stateParams', '$log', 'customerFactory', 'siteFactory', 'toastFactory',
          CustomerViewController
       ]);

  function CustomerViewController($stateParams, $log, customerFactory, siteFactory, toastFactory) {
    var vm = this;
    vm.sites = [];
    vm.customer = {};

    siteFactory.find($stateParams.customer_id, { 'customer': $stateParams.customer_id })
      .then(function (res) {
        vm.sites = [].concat(res.data);
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fetching your sites.');
      });

    customerFactory.get($stateParams.customer_id)
      .then(function (res) {
        vm.customer = res.data;
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fetching your customer.');
      });

  };

})();
