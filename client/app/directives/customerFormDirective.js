(function() {
  'use strict';

  angular
    .module('app')
    .directive('secCustomerForm', customerFormDirective);

  function customerFormDirective() {
    return {
      restrict: 'EA',
      controller: customerFormController,
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        customer: '=',
        onSubmit: '&',
        hideMap: '=',
        crudState: '='
      },
      transclude: true,
      templateUrl: 'app/views/customers/_form.html'
    };
  };

  function customerFormController(toastFactory, geocodeFactory) {
    var vm = this;
  };

})();
