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
    vm.event = {};
    vm.comment = {};
    vm.create = _create;
  //  data = {};


    _fetchSites();
    _fetchCategories();

    function _create(event, comment) {
    //  data.event = vm.event;
    //  data.comment = vm.comment;
      // create the event
      eventFactory.create(event)
        .then(function (resp) {
          comment.event = resp.data._id; // add the id from the created event
          commentFactory.create(comment)
          .then(function (resp) {
            $state.go('home.events.list');
          })
          .catch(function (resp) {
              toastFactory.showSimpleToast('Error creating comment');
          });
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

    function _fetchCategories(){
      categoryFactory.list().then(function(resp){
        vm.categories = resp.data;
      });
    }
  };
})();
