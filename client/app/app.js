angular.module('logApp', [])
  .factory('httpRequestInterceptor', ['localStorage', function (localStorage) {
    return {
      request: function (config) {
        var auth = localStorage.getObject('authentication');
        config.headers['Authorization'] = 'Bearer ' + auth.access_token;
        return config;
      }
    };
  }])

  // configuration phase block
  .config(['$httpProvider', function ($httpProvider) {
    // add the $http interceptor
    $httpProvider.interceptors.push('httpRequestInterceptor');
  }])

  // run block
  .run(['$rootScope', 'localStorage', function ($rootScope, localStorage) {
    // ensure root scope object is initialised
    $rootScope.authentication = localStorage.getObject('authentication');
  }]);
