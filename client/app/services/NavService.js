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
        sref: '.dashboard'
      },
      {
        name: 'Events',
        icon: 'storage',
        sref: '.events.list'
      },
      {
        name: 'Customers',
        icon: 'perm_contact_calendar',
        sref: '.customers.list'
      },
      {
        name: 'Organisation',
        icon: 'account_balance',
        sref: '.organisation'
      },
      {
        name: 'Categories',
        icon: 'storage',
        sref: '.categories.list'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
