(function(){
  'use strict';

  angular
       .module('app')
       .controller('CustomerEditController', [
          '$log', '$state', 'customerFactory', 'toastFactory',
          CustomerEditController
       ]);

  function CustomerEditController($log, $state, customerFactory, toastFactory) {
    var vm = this;

  };

})();
