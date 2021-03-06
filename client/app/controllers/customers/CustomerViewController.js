(function(){
  'use strict';

  angular
       .module('app')
       .controller('CustomerViewController', [
          '$stateParams', '$log', 'customerFactory', 'siteFactory', 'toastFactory', 'pageStateFactory',
          CustomerViewController
       ]);

  function CustomerViewController($stateParams, $log, customerFactory, siteFactory, toastFactory, pageStateFactory) {
    var vm = this;
    vm.sites = [];
    vm.customer = {};
    vm.crudState = new pageStateFactory.crudState('read');

    vm.map = {
      center: { latitude: 53.5873599, longitude: -2.57864},
      markers: [],
      zoom: 8
    };

    siteFactory.find($stateParams.customer_id, { 'customer': $stateParams.customer_id })
      .then(function (res) {
        vm.sites = [].concat(res.data);
        vm.sites.forEach(function (e) {
          vm.map.markers.push({id: e._id, latitude: e.address.lat, longitude: e.address.lng });
        });
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fetching your sites.');
      });

    customerFactory.get($stateParams.customer_id)
      .then(function (res) {
        vm.customer = res.data;
      })
      .catch(function (res) {
        toastFactory.showSimpleToast('Error fetching your customer.');
      });

  };

})();
