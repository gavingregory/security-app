(function(){
  'use strict';

  angular
       .module('app')
       .controller('OrganisationViewController', [
          '$log', 'organisationFactory', 'toastFactory',
          OrganisationViewController
       ]);

  function OrganisationViewController($log, organisationFactory, toastFactory) {
    var vm = this;

    vm.organisation = {};

    organisationFactory.get()
      .then(function (resp) {
        vm.organisation = resp.data;
      })
      .catch(function (resp) {
        toastFactory.showSimpleToast('Error fetching data!');
      });

  };

})();
