(function(){

  angular
    .module('app')
    .controller('SearchController', [
      '$timeout', '$q',
      SearchController
    ]);

  function SearchController($timeout, $q) {
    var vm = this;

    function querySearch (query) {
    }

    function createFilterFor(query) {
    }
  }
})();
