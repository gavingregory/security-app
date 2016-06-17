(function(){
  'use strict';

  angular
       .module('app')
       .controller('SiteEditController', [
          '$stateParams', 'siteFactory', 'toastFactory', 'pageStateFactory',
          SiteEditController
       ]);

  function SiteEditController($stateParams, siteFactory, toastFactory, pageStateFactory) {
    var vm = this;
    vm.site = {};
    vm.update = _update;
    vm.crudState = new pageStateFactory.crudState('update');

    siteFactory.get($stateParams.site_id)
      .then(function (res) {
        vm.site = res.data;
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fetching your site.');
      });

    function _update(site) {
      siteFactory.update(site)
        .then(function (resp) {
          toastFactory.showSimpleToast('Success, site updated.');
        })
        .catch(function (resp) {
          toastFactory.showSimpleToast('Error updating site.');
        });
    };
  };

})();
