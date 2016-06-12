'use strict';

angular.module('logApp', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'btford.socket-io', 'uiGmapgoogle-maps'])

  .factory('socket', function (socketFactory) {
    var serverBaseUrl = 'http://localhost:8080';
    var myIoSocket = io.connect(serverBaseUrl);
    var socket = socketFactory({
       ioSocket: myIoSocket
   });
    socket.forward('connection');
    socket.forward('error');
    return socket;
  })

  .factory('httpRequestInterceptor', ['localStorage', function (localStorage) {

    function _request(config) {
      if (config.url.substring(0,27) !== 'https://maps.googleapis.com') {
        var auth = localStorage.getObject('authentication');
        config.headers['Authorization'] = 'Bearer ' + auth.access_token;
      }
      return config;
    };

    return {
      request: _request
    };
  }])

  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider, uiGmapGoogleMapApiProvider) {

    /* HTTP Interceptor configuration */

    $httpProvider.interceptors.push('httpRequestInterceptor');

    /* Google Maps configuration */

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAlnYZjI-QOAzwn8V0zqN9vLgylasTKmhg',
      v: 3.26,
      libraries: 'weather,geometry,visualization'
    });

    /* State configuration */

    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.html',
        data: {
          title: 'Dashboard'
        }
      })
      .state('home.organisation', {
        url: '/organisation',
        templateUrl: 'app/views/organisation/view.html',
        controller: 'OrganisationViewController',
        controllerAs: 'vm',
        data: {
          title: 'Organisation'
        }
      })
      .state('home.events', {
        url: '/events',
        controller: 'EventListController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/list.html',
        data: {
          title: 'Events'
        }
      })
      .state('home.customers', {
        url: '/customers',
        controller: 'CustomerListController',
        controllerAs: 'vm',
        templateUrl: 'app/views/customers/list.html',
        data: {
          title: 'Customers'
        }
      })
      .state('home.customers.create', {
        url: '/customers/create',
        controller: 'CustomerCreateController',
        controllerAs: 'vm',
        templateUrl: 'app/views/customers/create.html',
        data: {
          title: 'Create a Customer'
        },
        parent: 'home'
      });

    $urlRouterProvider.otherwise('/dashboard');

    /* Material Design configuration */

    $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('orange', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('defaultPrimary')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdThemingProvider.theme('custom', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
    });

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50':  '#FFFFFF',
      '100': 'rgb(255, 198, 197)',
      '200': '#E75753',
      '300': '#E75753',
      '400': '#E75753',
      '500': '#E75753',
      '600': '#E75753',
      '700': '#E75753',
      '800': '#E75753',
      '900': '#E75753',
      'A100': '#E75753',
      'A200': '#E75753',
      'A400': '#E75753',
      'A700': '#E75753'
    });

    $mdIconProvider.icon('user', 'assets/images/user.svg', 64);

  })

  .run(['$rootScope', 'localStorage', function ($rootScope, localStorage) {
    // ensure root scope object is initialised
    $rootScope.authentication = localStorage.getObject('authentication');
  }]);
