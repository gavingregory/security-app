(function(){
  'use strict';

  angular
  .module('app')
  .controller('EventCreateController', [
  '$log', '$state', 'eventFactory', 'siteFactory', 'categoryFactory', 'commentFactory', 'toastFactory',
    EventCreateController
  ]);

  function EventCreateController($log, $state, eventFactory, siteFactory, categoryFactory, commentFactory, toastFactory) {
    var vm = this;

    vm.sites = [];
    vm.categories = [];
    vm.data = {
      event: {},
      comment: ''
    }
    vm.create = _create;

    _fetchSites();
    _fetchCategories();



    function _create(data) {
      // create the event
      eventFactory.create(data)
        .then(function (resp) {
          $state.go('home.events.list');
        })
        .catch(function (resp) {
          toastFactory.showSimpleToast('Error creating event');
          console.log(resp.data);
        });

    };

    function _fetchSites(){
      siteFactory.list().then(function(resp){
        vm.sites = resp.data;
      });
    }

    function _fetchCategories(){
      categoryFactory.list().then(function(resp){
        vm.categories = resp.data;
      });
    }
  };
})();
