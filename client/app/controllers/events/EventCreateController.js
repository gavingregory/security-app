(function(){
  'use strict';

  angular
  .module('app')
  .controller('EventCreateController', [
  '$log', '$state', 'eventFactory', 'commentFactory', 'toastFactory', 'pageStateFactory',
    EventCreateController
  ]);

  function EventCreateController($log, $state, eventFactory, commentFactory, toastFactory, pageStateFactory) {
    var vm = this;


    vm.create = _create;
    vm.crudState = new pageStateFactory.crudState('create');

    vm.event = {
      comments: [{
        text: ''
      }]
    };

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


  };
})();
