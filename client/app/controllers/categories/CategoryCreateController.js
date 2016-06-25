(function(){
  'use strict';

  angular
  .module('logApp')
  .controller('CategoryCreateController', [
  '$log', '$state', 'categoryFactory', 'toastFactory',
    CategoryCreateController
  ]);

  function CategoryCreateController($log, $state, categoryFactory, toastFactory ) {
    var vm = this;

    vm.category = {};
    vm.colorPickerOptions = {
      type: 0,
      label: 'Please select a colour',
      icon: 'brush',
      random: true,
      sliders: false,
      history: false,
      hex: true,
      rgb: false,
      hsl: false,
      openOnInput: true
    }
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
