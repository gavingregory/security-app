angular.module('logApp')
  .factory('organisationFactory', function ($http) {
    return {
      create: function (data) {
        return $http.post('api/v1/organisations', data);
      },
      get: function (id) {
        return $http.get('api/v1/organisations/' + id);
      },
      update: function (data) {
        return $http.put('api/v1/organisations/' + data._id, data);
      },
      delete: function (id) {
        return $http.delete('api/v1/organisations/' + id);
      }
    };
  });
