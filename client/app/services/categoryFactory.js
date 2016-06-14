angular.module('logApp')
  .factory('categoryFactory', ['$http', function ($http) {
    return {
      list: function () {
        return $http.get('api/v1/categories/');
      },
      create: function (data) {
        console.log(data);
        return $http.post('api/v1/categories/', data);
      },
      get: function (id) {
        return $http.get('api/v1/categories/' + id);
      },
      update: function (data) {
        return $http.put('api/v1/categories/' + data._id, data);
      },
      delete: function (id) {
        return $http.delete('api/v1/categories/' + id);
      }
    };
  }]);
