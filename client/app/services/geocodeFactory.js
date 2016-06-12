(function(){
  'use strict';

  angular.module('app')
          .factory('geocodeFactory', [
          '$http',
          geocodeFactory
  ]);

  function geocodeFactory($http){

    function _geocode(address) {
      return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAlnYZjI-QOAzwn8V0zqN9vLgylasTKmhg');
    };

    return {
      geocode : _geocode
    };
  }

})();
