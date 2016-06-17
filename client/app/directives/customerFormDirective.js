(function() {
  'use strict';

  angular
    .module('app')
    .directive('secCustomerForm', customerFormDirective);

  function customerFormDirective() {
    return {
      restrict: 'EA',
      controller: ['toastFactory', customerFormController],
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

  function customerFormController(toastFactory) {
    var vm = this;
  };

})();
