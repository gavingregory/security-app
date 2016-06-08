angular.module('logApp')
  .directive('buttonHref', ['$location', function ($location) {
    return function ( scope, element, attrs ) {
      var path;

      attrs.$observe('buttonHref', function (val) {
        path = val;
      });

      element.bind('click', function () {
        scope.$apply(function () {
          $location.path( path );
        });
      });
    };
  }]);
