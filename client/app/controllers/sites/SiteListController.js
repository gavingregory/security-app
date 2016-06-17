(function(){
  'use strict';

  angular
       .module('app')
       .controller('SiteListController', [
          '$log', '$state', 'siteFactory', 'toastFactory',
          SiteListController
       ]);

  function SiteListController($log, $state, siteFactory, toastFactory) {
    var vm = this;

    vm.sites = [];

    siteFactory.list()
      .then(function (res) {
        vm.sites = [].concat(res.data);
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fetching sites!');
      });
  };

})();
