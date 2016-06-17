(function() {
  'use strict';

  angular
    .module('app')
    .directive('secSiteForm', siteFormDirective);

  function siteFormDirective() {
    return {
      restrict: 'EA',
      controller: ['toastFactory', 'customerFactory', siteFormController],
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        site: '=',
        onSubmit: '&',
        hideMap: '=',
        crudState: '='
      },
      transclude: true,
      templateUrl: 'app/views/sites/_form.html'
    };
  };

  function siteFormController(toastFactory, customerFactory) {
    var vm = this;

    vm.customers = [];
    vm.selectedCustomerName = null;
    vm.site = {};
    vm.customerDisplayName = _customerDisplayName;

    customerFactory.list()
      .then(function(res){
        vm.customers = [].concat(res.data);
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fectching customers!');
      });

    function _customerDisplayName(id, array) {
      array.forEach(function (e) {
        if (e._id === id) return vm.selectedCustomerName = e.name;
      });
    };
  }

})();
