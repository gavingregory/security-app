angular.module('logApp', ['ngRoute'])
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
  .config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
    // add the $http interceptor
    $httpProvider.interceptors.push('httpRequestInterceptor');

    // configure routes
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html'
      })
      .when('/events', {
        templateUrl: 'app/views/events/list.html',
        controller: 'eventListCtrl.js'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])

  // run block
  .run(['$rootScope', 'localStorage', function ($rootScope, localStorage) {
    // ensure root scope object is initialised
    $rootScope.authentication = localStorage.getObject('authentication');
  }]);
