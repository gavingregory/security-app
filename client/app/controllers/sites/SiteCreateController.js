(function(){
  'use strict';

  angular
  .module('app')
  .controller('SiteCreateController', [
    '$log', '$state', 'customerFactory', 'siteFactory', 'toastFactory',
    SiteCreateController
  ]);

  function SiteCreateController($log, $state, customerFactory, siteFactory, toastFactory) {
    var vm = this;
    vm.customers = [];
    vm.selectedCustomerName = null;
    vm.site = {};
    vm.create = _create;
    vm.customerDisplayName = _customerDisplayName;

    customerFactory.list()
      .then(function(res){
        vm.customers = [].concat(res.data);
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fectching customers!');
      });

    function _create(customer) {
      siteFactory.create(vm.site)
        .then(function(res){
          $state.go('home.sites.list');
        })
        .catch(function(err){
          toastFactory.showSimpleToast('Error creating the site!');
        })
    };

    function _customerDisplayName(id, array) {
      array.forEach(function (e) {
        if (e._id === id) return vm.selectedCustomerName = e.name;
      })
    };
  };

})();
