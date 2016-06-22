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
    vm.event = {
      comments: [{
        text: ''
      }]
    };
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
      siteFactory.list().then(function(res){
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].full_name = res.data[i].customer.name + ": " + res.data[i].name;
        }
        vm.sites = res.data;
      });
    }

    function _fetchCategories(){
      categoryFactory.list().then(function(resp){
        vm.categories = resp.data;
      });
    }
  };
})();
