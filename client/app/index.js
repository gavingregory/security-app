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

      /* State: Organisation */

      .state('home.organisation', {
        url: '/organisation',
        templateUrl: 'app/views/organisation/view.html',
        controller: 'OrganisationViewController',
        controllerAs: 'vm',
        data: {
          title: 'Organisation'
        }
      })
      .state('home.organisation.edit', {
        url: '/organisation/edit',
        templateUrl: 'app/views/organisation/edit.html',
        controller: 'OrganisationEditController',
        controllerAs: 'vm',
        data: {
          title: 'Edit your Organisation'
        },
        parent: 'home'
      })
      .state('home.organisation.view', {
        url: '/organisation',
        templateUrl: 'app/views/organisation/view.html',
        controller: 'OrganisationViewController',
        controllerAs: 'vm',
        data: {
          title: 'View an Organisation'
        },
        parent: 'home'
      })

      /* State: Events */

      .state('home.events', {
        url: '/events',
        controller: 'EventListController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/list.html',
        data: {
          title: 'Events'
        }
      })
      .state('home.events.create', {
        url: '/events',
        controller: 'EventCreateController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/create.html',
        data: {
          title: 'Create an Event'
        },
        parent: 'home'
      })
      .state('home.events.edit', {
        url: '/events',
        controller: 'EventEditController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/edit.html',
        data: {
          title: 'Edit an Event'
        },
        parent: 'home'
      })
      .state('home.events.view', {
        url: '/events',
        controller: 'EventViewController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/view.html',
        data: {
          title: 'View an Event'
        },
        parent: 'home'
      })
      .state('home.sites', {
        url: '/sites',
        controller: 'SiteListController',
        controllerAs: 'vm',
        templateUrl: 'app/views/sites/list.html',
        data: {
          title: 'Sites'
        }
      })
      .state('home.sites.create', {
        url: '/sites',
        controller: 'SiteCreateController',
        controllerAs: 'vm',
        templateUrl: 'app/views/sites/create.html',
        data: {
          title: 'Create a Site'
        },
        parent: 'home'
      })
      .state('home.sites.edit', {
        url: '/sites',
        controller: 'SiteEditController',
        controllerAs: 'vm',
        templateUrl: 'app/views/sites/edit.html',
        data: {
          title: 'Edit a Site'
        },
        parent: 'home'
      })
      .state('home.sites.view', {
        url: '/sites',
        controller: 'SiteViewController',
        controllerAs: 'vm',
        templateUrl: 'app/views/sites/view.html',
        data: {
          title: 'View a Site'
        },
        parent: 'home'
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
      })
      .state('home.customers.edit', {
        url: '/customers/edit',
        controller: 'CustomerEditController',
        controllerAs: 'vm',
        templateUrl: 'app/views/customers/edit.html',
        data: {
          title: 'Edit a Customer'
        },
        parent: 'home'
      })
      .state('home.customers.view', {
        url: '/customers/view',
        controller: 'CustomerViewController',
        controllerAs: 'vm',
        templateUrl: 'app/views/customers/view.html',
        data: {
          title: 'View a Customer'
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
