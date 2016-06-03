angular.module('logApp', [])
  .factory('httpRequestInterceptor', ['$rootScope', function ($rootScope) {
    return {
      request: function (config) {
        if ($rootScope.oauth) config.headers['Authorization'] = 'Bearer ' + $rootScope.oauth.access_token;
        return config;
      }
    };
  }])

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
  }]);
