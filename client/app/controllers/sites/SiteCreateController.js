(function(){
  'use strict';

  angular
  .module('app')
  .controller('SiteCreateController', [
    '$log', '$state', 'customerFactory', 'siteFactory', 'toastFactory', 'pageStateFactory',
    SiteCreateController
  ]);

  function SiteCreateController($log, $state, customerFactory, siteFactory, toastFactory, pageStateFactory) {
    var vm = this;
    vm.create = _create;
    vm.crudState = new pageStateFactory.crudState('create');

    function _create(customer) {
      siteFactory.create(vm.site)
        .then(function(res){
          $state.go('home.sites.view', {site_id: res.data._id});
        })
        .catch(function(err){
          toastFactory.showSimpleToast('Error creating the site!');
        });
    };
  };

})();
