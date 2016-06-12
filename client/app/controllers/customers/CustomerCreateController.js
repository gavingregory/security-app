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
      center: { latitude: 53.5873599, longitude: -2.57864},
      markers: [{ latidude : 53.5873599, longitude: -2.57864 }],
      zoom: 8
    };

    function _geocode(address) {
      if (address.length > 5)
      geocodeFactory.geocode(address)
        .then(function (res) {
          toastFactory.showSimpleToast('Success geocoding');
          console.log(res.data);
          var location = res.data.results[0].geometry.location;
          vm.map.markers = [].concat({
            latitude: location.lat, longitude: location.lng
          });
          vm.map.center = vm.map.markers[0];
          vm.map.zoom = 12;

          vm.customer.address.raw = res.data.results[0].formatted_address;
          vm.customer.address.number = res.data.results[0].address_components[0].long_name;
          vm.customer.address.street = res.data.results[0].address_components[1].long_name;
          vm.customer.address.town = res.data.results[0].address_components[2].long_name;
          vm.customer.address.city = res.data.results[0].address_components[3].long_name;
          vm.customer.address.county = res.data.results[0].address_components[4].long_name;
          vm.customer.address.country = res.data.results[0].address_components[5].long_name;
          vm.customer.address.pc_zip = res.data.results[0].address_components[6].long_name;
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
