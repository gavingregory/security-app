(function(){
  'use strict';

  angular
  .module('app')
  .controller('CustomerCreateController', [
    '$log', '$state', 'customerFactory', 'toastFactory', 'geocodeFactory',
    CustomerCreateController
  ]);

  function CustomerCreateController($log, $state, customerFactory, toastFactory, geocodeFactory) {
    var vm = this;

    vm.customer = {};
    vm.create = _create;
    vm.geocode = _geocode;

    vm.map = {
      center: [53.5873599,-2.57864],
      markers: [{position: [53.5873599, -2.57864] }],
      zoom: 8
    };

    function _geocode(address) {
      geocodeFactory.geocode(address)
        .then(function (res) {
          toastFactory.showSimpleToast('Success geocoding');
          console.log(res.data);
          vm.map.markers =
          [].concat({
            position: [ res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng ]
          });

          //vm.map.center = res.data.results[0].geometry.location;
          vm.map.zoom = 12;
        })
        .catch(function (res) {
          toastFactory.showSimpleToast('Error geocoding');
          console.log(res.data);
        });
    };

    function _create(customer) {
      customerFactory.create(customer)
        .then(function (resp) {
          $state.go('home.customers');
        })
        .catch(function (resp) {
          toastFactory.showSimpleToast('Error creating customer');
        });
    };

  };

})();
