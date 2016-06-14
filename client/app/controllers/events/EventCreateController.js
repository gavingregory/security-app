(function(){
  'use strict';

  angular
  .module('app')
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
      eventFactory.create(event)
        .then(function (resp) {
          $state.go('home.events.list');
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
