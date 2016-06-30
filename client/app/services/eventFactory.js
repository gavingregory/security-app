angular.module('logApp')
  .factory('eventFactory', ['$http', function ($http) {
    return {
      list: function () {
        return $http.get('api/v1/events/');
      },
      create: function (data) {
        return $http.post('api/v1/events/', data);
      },
      get: function (id) {
        return $http.get('api/v1/events/' + id);
      },
      update: function (data) {
        return $http.put('api/v1/events/' + data._id, data);
      },
      delete: function (id) {
        return $http.delete('api/v1/events/' + id);
      },
      resolve: function(id) {
        return $http.put('api/v1/events/' + id + '/resolve');
      }
    };
  }]);
