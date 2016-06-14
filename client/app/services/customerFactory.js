angular.module('logApp')
  .factory('customerFactory', ['$http', function ($http) {
    return {
      list: function () {
        return $http.get('api/v1/customers');
      },
      create: function (data) {
        return $http.post('api/v1/customers', data);
      },
      get: function (id) {
        return $http.get('api/v1/customers/' + id);
      },
      update: function (data) {
        return $http.put('api/v1/customers/' + data._id, data);
      },
      delete: function (id) {
        return $http.delete('api/v1/customers/' + id);
      },
      find: function (params) {
        return $http({
          url: 'api/v1/customers',
          method: 'GET',
          params: params,
          paramSerializer: '$httpParamSerializerJQLike'
        });
      }
    };
  }]);
