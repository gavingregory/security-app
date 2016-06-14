angular.module('logApp')
  .factory('siteFactory', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {
    return {
      list: function (id) {
        return $http.get('api/v1/customers/' + id + '/sites');
      },
      create: function (data) {
        return $http.post('api/v1/customers/' + data.customer + '/sites', data);
      },
      get: function (custId, siteId) {
        return $http.get('api/v1/customers/' + custId + '/sites/' + siteId);
      },
      update: function (data) {
        return $http.put('api/v1/customers/' + data.customer + '/sites/' + data._id, data);
      },
      delete: function (custId, siteId) {
        return $http.delete('api/v1/customers/' + custId + '/sites/' + siteId);
      },
      find: function (custId, params) {
        return $http({
          url: 'api/v1/customers/' + custId + '/sites',
          method: 'GET',
          params: params,
          paramSerializer: '$httpParamSerializerJQLike'
        });
      }
    };
  }]);
