(function(){
  'use strict';

  angular.module('app')
          .service('navService', [
          '$q',
          navService
  ]);

  function navService($q){
    var menuItems = [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        sref: 'home.dashboard'
      },
      {
        name: 'Events',
        icon: 'storage',
        sref: 'home.events.list'
      },
      {
        name: 'Customers',
        icon: 'location_city',
        sref: 'home.customers.list'
      },
      {
        name: 'Sites',
        icon: 'domain',
        sref: 'home.sites.list'
      },
      {
        name: 'Organisation',
        icon: 'account_balance',
        sref: 'home.organisation'
      },
      {
        name: 'Categories',
        icon: 'storage',
        sref: 'home.categories.list'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
