(function(){
  'use strict';

  angular.module('app')
          .factory('toastFactory', [
          '$mdToast',
          toastFactory
  ]);

  function toastFactory($mdToast){

    function _showSimpleToast(title, delay, position) {
      var _title = title ? title : ' ';
      var _delay = delay ? delay : 2000;
      var _position = position ? position : 'bottom right';

      $mdToast.show(
        $mdToast.simple()
          .content(_title)
          .hideDelay(_delay)
          .position(_position)
      );
    };

    return {
      showSimpleToast : _showSimpleToast
    };
  }

})();
