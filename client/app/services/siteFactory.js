angular.module('logApp')
  .factory('siteFactory', ['$http', function ($http) {
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
      }
    };
  }]);
