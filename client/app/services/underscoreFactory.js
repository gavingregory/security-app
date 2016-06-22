(function(){
  'use strict';

  angular.module('app')
          .factory('_', ['$window',
          underscoreFactory
  ]);

  function underscoreFactory($window){
    if (!$window._) throw Error('Underscore is not available.');
    return $window._;
  }

})();
