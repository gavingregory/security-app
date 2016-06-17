(function(){
  'use strict';



angular
  .module('app')
  .controller('EventViewController', [
    '$stateParams', '$log', 'eventFactory', 'toastFactory', EventViewController
  ]);

  function EventViewController($stateParams, $log, eventFactory, toastFactory) {
    var vm = this;
    vm.event = {};
    eventFactory.get($stateParams.event_id)
    .then(function(res){
      console.log(res.data);
      vm.event = res.data;
    })
    .catch(function (res) {
      toastFactory.showSimpleToast('Error fetching event details.');
    });


  };
})();
