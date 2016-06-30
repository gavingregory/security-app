(function() {
  'use strict'

  angular
  .module('app')
  .directive('secEventForm', eventFormDirective);

  function eventFormDirective(){
    return{
      restrict: 'E', //only matches element
      controller: ['toastFactory', 'siteFactory','categoryFactory',eventFormController], // inject toast factory and name this controller
      controllerAs: 'vm', // this controller is known as
      scope: {},
      bindToController: {
        event: '=', // look for an attribute called data and bind to controller
        onSubmit: '&',
        crudState: '=',
      },
      transclude: true,
      templateUrl: 'app/views/events/_form.html'
    };
  };

  function eventFormController(toastFactory, siteFactory, categoryFactory){
    var vm = this;
    vm.sites = [];
    vm.categories = [];
    _fetchSites();
    _fetchCategories();

    function _fetchSites(){
      siteFactory.list().then(function(res){
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].full_name = res.data[i].customer.name + ": " + res.data[i].name;
        }
        vm.sites = res.data;
      });
    }

    function _fetchCategories(){
      categoryFactory.list().then(function(resp){
        vm.categories = resp.data;
      });
    }


  };
})();
