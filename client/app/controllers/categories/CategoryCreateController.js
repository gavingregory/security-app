(function(){
  'use strict';

  angular
  .module('logApp')
  .controller('CategoryCreateController', [
  '$log', '$state', 'categoryFactory', 'toastFactory', 'mdColorPicker',
    CategoryCreateController
  ]);

  function CategoryCreateController($log, $state, categoryFactory, toastFactory, mdColorPicker) {
    var vm = this;

    vm.category = {};
    vm.create = _create;

    function _create(category) {
      categoryFactory.create(category)
        .then(function (resp) {
          $state.go('home.categories.list');
        })
        .catch(function (resp) {
          toastFactory.showSimpleToast('Error creating event');
        });
    };
  };
})();
