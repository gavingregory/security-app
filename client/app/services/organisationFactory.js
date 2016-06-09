angular.module('logApp')
  .factory('organisationFactory', ['$http', function ($http) {
    return {
      create: function (data) {
        return $http.post('api/v1/organisations', data);
      },
      get: function () {
        return $http.get('api/v1/organisations');
      },
      update: function (data) {
        return $http.put('api/v1/organisations', data);
      },
      delete: function () {
        return $http.delete('api/v1/organisations');
      }
    };
  }]);
