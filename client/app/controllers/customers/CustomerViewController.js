(function(){
  'use strict';

  angular
       .module('app')
       .controller('CustomerViewController', [
          '$stateParams', '$log', 'siteFactory', 'toastFactory',
          CustomerViewController
       ]);

  function CustomerViewController($stateParams, $log, siteFactory, toastFactory) {
    var vm = this;
    vm.sites = [];

    siteFactory.find($stateParams.customer_id, { 'customer': $stateParams.customer_id })
      .then(function (resp) {
        vm.sites = [].concat(resp.data);
      })
      .catch(function (resp) {
        toastFactory.showSimpleToast('Error fetching data!');
      });

  };

})();
