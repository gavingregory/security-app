(function(){
  'use strict';

  angular
  .module('logApp')
  .controller('EventCreateController', [
  '$log', '$state', 'eventFactory', 'siteFactory', 'toastFactory',
    EventCreateController
  ]);

  function EventCreateController($log, $state, eventFactory, siteFactory, toastFactory) {
    var vm = this;

    vm.sites = [];
    vm.event = {};
    vm.create = _create;

    _fetchSites();

    function _create(event) {
      eventFactory.create(vm.event)
        .then(function (resp) {
          $state.go('home.events');
        })
        .catch(function (resp) {
          toastFactory.showSimpleToast('Error creating event');
        });
    };

    function _fetchSites(){
      siteFactory.list().then(function(resp){
        vm.sites = resp.data;
      });

    }
  };
})();
