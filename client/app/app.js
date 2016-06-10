
var serverBaseUrl = 'http://localhost:8080';

angular.module('logApp', [ 'ngRoute', 'ngMaterial', 'btford.socket-io'])

  .factory('socket', function (socketFactory) {
    var myIoSocket = io.connect(serverBaseUrl);
    var socket = socketFactory({
       ioSocket: myIoSocket
   });
    socket.forward('connection');
    socket.forward('error');
    return socket;
  })
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
  .config(['$httpProvider', '$routeProvider', '$mdThemingProvider', function ($httpProvider, $routeProvider, $mdThemingProvider) {
    // add the $http interceptor
    $httpProvider.interceptors.push('httpRequestInterceptor');

    // configure routes
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html'
      })
      .when('/signup', {
        templateUrl: 'app/views/account/signup.html',
        controller: 'signupCtrl'
      })
      .when('/login', {
        templateUrl: 'app/views/account/login.html',
        controller: 'loginCtrl'
      })
      .when('/events', {
        templateUrl: 'app/views/events/list.html',
        controller: 'eventListCtrl'
      })
      .when('/events/create', {
        templateUrl: 'app/views/events/create.html',
        controller: 'eventCreateCtrl'
      })
      .when('/events/:id/view', {
        templateUrl: 'app/views/events/view.html',
        controller: 'eventViewCtrl'
      })
      .when('/events/:id/edit', {
        templateUrl: 'app/views/events/edit.html',
        controller: 'eventEditCtrl'
      })
      .when('/events/:id/delete', {
        templateUrl: 'app/views/events/delete.html',
        controller: 'eventDeleteCtrl'
      })
      .when('/customers', {
        templateUrl: 'app/views/customers/list.html',
        controller: 'customerListCtrl'
      })
      .when('/customers/create', {
        templateUrl: 'app/views/customers/create.html',
        controller: 'customerCreateCtrl'
      })
      .when('/customers/:id/view', {
        templateUrl: 'app/views/customers/view.html',
        controller: 'customerViewCtrl'
      })
      .when('/customers/:id/edit', {
        templateUrl: 'app/views/customers/edit.html',
        controller: 'customerEditCtrl'
      })
      .when('/customers/:id/delete', {
        templateUrl: 'app/views/customers/delete.html',
        controller: 'customerDeleteCtrl'
      })
      .when('/sites', {
        templateUrl: 'app/views/sites/list.html',
        controller: 'siteListCtrl'
      })
      .when('/sites/create', {
        templateUrl: 'app/views/sites/create.html',
        controller: 'siteCreateCtrl'
      })
      .when('/sites/:id/view', {
        templateUrl: 'app/views/sites/view.html',
        controller: 'siteViewCtrl'
      })
      .when('/sites/:id/edit', {
        templateUrl: 'app/views/sites/edit.html',
        controller: 'siteEditCtrl'
      })
      .when('/sites/:id/delete', {
        templateUrl: 'app/views/sites/delete.html',
        controller: 'siteDeleteCtrl'
      })
      .when('/organisation', {
        templateUrl: 'app/views/organisation/view.html',
        controller: 'organisationViewCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // configure material themes
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
  }])

  // run block
  .run(['$rootScope', 'localStorage', function ($rootScope, localStorage) {
    // ensure root scope object is initialised
    $rootScope.authentication = localStorage.getObject('authentication');
  }]);
