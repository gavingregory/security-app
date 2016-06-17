'use strict';

angular.module('logApp', ['ngAnimate', 'ngCookies',
  'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'btford.socket-io', 'uiGmapgoogle-maps', 'mdColorPicker'])

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

      /* State: Events */
      .state('home.events', {
        abstract: true,
        url: '/events',
        templateUrl: 'app/views/parent.html',
      })
      .state('home.events.list', {
        url: '',
        controller: 'EventListController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/list.html',
        data: {
          title: 'Events'
        }
      })
      .state('home.events.create', {
        url: '/create',
        controller: 'EventCreateController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/create.html',
        data: {
          title: 'Create an Event'
        },
      })
      .state('home.events.edit', {
        url: '/edit/:id',
        controller: 'EventEditController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/edit.html',
        data: {
          title: 'Edit an Event'
        },
      })
      .state('home.events.view', {
        url: '/view/:id',
        controller: 'EventViewController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/view.html',
        data: {
          title: 'View an Event'
        },
      })
      .state('home.events.delete', {
        url: '/delete/:id',
        controller: 'EventDeleteController',
        controllerAs: 'vm',
        templateUrl: 'app/views/events/delete.html',
        data: {
          title: 'Delete an Event'
        },
      })

      /* State: Categories */
      .state('home.categories', {
        abstract: true,
        url: '/categories',
        templateUrl: 'app/views/parent.html',
      })
      .state('home.categories.list', {
        url: '',
        controller: 'CategoryListController',
        controllerAs: 'vm',
        templateUrl: 'app/views/categories/list.html',
        data: {
          title: 'Categories'
        }
      })
      .state('home.categories.create', {
        url: '/category',
        controller: 'CategoryCreateController',
        controllerAs: 'vm',
        templateUrl: 'app/views/categories/create.html',
        data: {
          title: 'Create a Category'
        },
      })
      .state('home.categories.edit', {
        url: '/edit/:id',
        controller: 'CategoryEditController',
        controllerAs: 'vm',
        templateUrl: 'app/views/categories/edit.html',
        data: {
          title: 'Edit a Category'
        },
      })
      .state('home.categories.view', {
        url: '/view/:id',
        controller: 'CategoryViewController',
        controllerAs: 'vm',
        templateUrl: 'app/views/categories/view.html',
        data: {
          title: 'View a Category'
        },
      })
      .state('home.categories.delete', {
        url: '/delete/:id',
        controller: 'CategoryDeleteController',
        controllerAs: 'vm',
        templateUrl: 'app/views/categories/delete.html',
        data: {
          title: 'Delete a Category'
        },
      })

      /* State: Sites */
      .state('home.sites', {
        abstract: true,
        url: '/sites',
        templateUrl: 'app/views/parent.html',
      })
      .state('home.sites.list', {
        url: '',
        controller: 'SiteListController',
        controllerAs: 'vm',
        templateUrl: 'app/views/sites/list.html',
        data: {
          title: 'Sites'
        }
      })
      .state('home.sites.create', {
        url: '/create',
        controller: 'SiteCreateController',
        controllerAs: 'vm',
        templateUrl: 'app/views/sites/create.html',
        data: {
          title: 'Create a Site'
        }
      })
      .state('home.sites.edit', {
        url: '/edit/:site_id',
        controller: 'SiteEditController',
        controllerAs: 'vm',
        templateUrl: 'app/views/sites/edit.html',
        data: {
          title: 'Edit a Site'
        }
      })
      .state('home.sites.view', {
        url: '/view/:site_id',
        controller: 'SiteViewController',
        controllerAs: 'vm',
        templateUrl: 'app/views/sites/view.html',
        data: {
          title: 'View a Site'
        }
      })
      .state('home.sites.delete', {
        url: '/delete/:site_id',
        controller: 'SiteDeleteController',
        controllerAs: 'vm',
        templateUrl: 'app/views/sites/delete.html',
        data: {
          title: 'Delete a Site'
        },
      })

      /* State: Customers */
      .state('home.customers', {
        abstract: true,
        url: '/customers',
        templateUrl: 'app/views/parent.html',
      })
      .state('home.customers.list', {
        url: '',
        controller: 'CustomerListController',
        controllerAs: 'vm',
        templateUrl: 'app/views/customers/list.html',
        data: {
          title: 'Events'
        }
      })
      .state('home.customers.create', {
        url: '/create',
        controller: 'CustomerCreateController',
        controllerAs: 'vm',
        templateUrl: 'app/views/customers/create.html',
        data: {
          title: 'Create a Customer'
        },
        parent: 'home'
      })
      .state('home.customers.edit', {
        url: '/edit/:customer_id',
        controller: 'CustomerEditController',
        controllerAs: 'vm',
        templateUrl: 'app/views/customers/edit.html',
        data: {
          title: 'Edit a Customer'
        },
      })
      .state('home.customers.view', {
        url: '/view/:customer_id',
        controller: 'CustomerViewController',
        controllerAs: 'vm',
        templateUrl: 'app/views/customers/view.html',
        data: {
          title: 'View a Customer'
        },
      })
      .state('home.customers.delete', {
        url: '/delete/:customer_id',
        controller: 'CustomerDeleteController',
        controllerAs: 'vm',
        templateUrl: 'app/views/customers/delete.html',
        data: {
          title: 'Delete a Customer'
        },
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

  .run(['$log', function ($log) {
    // run code here
  }]);
