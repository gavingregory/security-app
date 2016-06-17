angular.module('logApp')
  .factory('siteFactory', ['$http', '$httpParamSerializerJQLike', function ($http, $httpParamSerializerJQLike) {
    return {
      list: function () {
        return $http.get('api/v1/sites');
      },
      create: function (data) {
        if (!data) throw new TypeError('Called siteFactory:create without data parameter.');
        return $http.post('api/v1/sites', data);
      },
      get: function (siteId) {
        if (!siteId) throw new TypeError('Called siteFactory:get without siteId parameter.');
        return $http.get('api/v1/sites/' + siteId);
      },
      update: function (data) {
        if (!data) throw new TypeError('Called siteFactory:update without data parameter.');
        return $http.put('api/v1/sites/' + data._id, data);
      },
      delete: function (siteId) {
        if (!siteId) throw new TypeError('Called siteFactory:delete without siteId parameter.');
        return $http.delete('api/v1/sites/' + siteId);
      },
      find: function (params) {
        if (!params) throw new TypeError('Called siteFactory:find without params parameter.');
        return $http({
          url: 'api/v1/sites',
          method: 'GET',
          params: params,
          paramSerializer: '$httpParamSerializerJQLike'
        });
      }
    };
  }]);
