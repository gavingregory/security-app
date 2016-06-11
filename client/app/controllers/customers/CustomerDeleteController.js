(function(){
  'use strict';

  angular
       .module('app')
       .controller('CustomerDeleteController', [
          '$log', '$state', 'customerFactory', 'toastFactory',
          CustomerDeleteController
       ]);

  function CustomerDeleteController($log, $state, customerFactory, toastFactory) {
    var vm = this;

  };

})();
