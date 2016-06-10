'use strict';

angular.module('logApp', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'btford.socket-io'])

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
    return {
      request: function (config) {
        var auth = localStorage.getObject('authentication');
        config.headers['Authorization'] = 'Bearer ' + auth.access_token;
        return config;
      }
    };
  }])

  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider) {
    // add the $http interceptor
    $httpProvider.interceptors.push('httpRequestInterceptor');

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
      .state('home.profile', {
        url: '/profile',
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Profile'
        }
      })
      .state('home.table', {
        url: '/table',
        controller: 'TableController',
        controllerAs: 'vm',
        templateUrl: 'app/views/table.html',
        data: {
          title: 'Table'
        }
      });

    $urlRouterProvider.otherwise('/dashboard');

    $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('teal', {
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
