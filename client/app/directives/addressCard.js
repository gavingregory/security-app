(function() {
  'use strict';

  angular
    .module('app')
    .directive('secAddressCard', addressCardDirective);

  function addressCardDirective() {
    return {
      restrict: 'EA',
      controller: ['toastFactory', 'geocodeFactory', addressCardController],
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        address: '=',
        hideMap: '=',
        crudState: '='
      },
      templateUrl: 'app/templates/addressCard.directive.html'
    };
  };

  function addressCardController(toastFactory, geocodeFactory) {
    var vm = this;
    vm.geocode = _geocode;

    vm.map = {
      center: { latitude: 55.1680845, longitude: -1.6905331 },
      markers: [],
      zoom: 8
    };
    if (vm.address && vm.address.lat && vm.address.lng){ // initialize map
      vm.map.markers.push({ latitude: vm.address.lat, longitude: vm.address.lng });
      vm.map.center.latitude = vm.address.lat;
      vm.map.center.longitude = vm.address.lng;
    }

    function _geocode(address) {
      if (address && address.length > 5)
      geocodeFactory.geocode(address)
        .then(function (res) {
          toastFactory.showSimpleToast('Address successfully retrieved.');
          var location = res.data.results[0].geometry.location;
          var components = res.data.results[0].address_components;
          vm.map.markers = [].concat({
            latitude: location.lat, longitude: location.lng
          });
          vm.map.center = vm.map.markers[0];
          vm.map.zoom = 12;

          vm.address.lat = location.lat;
          vm.address.lng = location.lng;
          vm.address.raw = res.data.results[0].formatted_address;
          vm.address.number = components[0] ? components[0].long_name : ' ';
          vm.address.street = components[1] ? components[1].long_name : ' ';
          vm.address.town = components[2] ? components[2].long_name : ' ';
          vm.address.city = components[3] ? components[3].long_name : ' ';
          vm.address.county = components[4] ? components[4].long_name : ' ';
          vm.address.country = components[5] ? components[5].long_name : ' ';
          vm.address.pc_zip = components[6] ? components[6].long_name : ' ';
        })
        .catch(function (res) {
          toastFactory.showSimpleToast('Error geocoding');
        });
    };
  };

})();
