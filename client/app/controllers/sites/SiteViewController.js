(function(){
  'use strict';

  angular
       .module('app')
       .controller('SiteViewController', [
          '$stateParams', '$log', 'siteFactory', 'toastFactory', 'pageStateFactory',
          SiteViewController
       ]);

  function SiteViewController($stateParams, $log, siteFactory, toastFactory, pageStateFactory) {
    var vm = this;
    vm.site = {};
    vm.crudState = new pageStateFactory.crudState('read');

    siteFactory.get($stateParams.site_id, { 'customer': $stateParams.customer_id })
      .then(function (res) {
        vm.site = res.data;
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fetching your sites.');
      });

  };

})();
