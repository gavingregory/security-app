angular.module('logApp')
  .controller('globalCtrl', ['$log', '$rootScope', '$scope', 'authFactory', 'eventFactory', function ($log, $rootScope, $scope, authFactory, eventFactory) {
    $scope.loggedIn = false;
    $scope.login = function (username, password) {
      authFactory.login({username: username, password: password})
        .then(function (res) {
          if (res.data._errors && res.data._errors.length) {
            $log.log(res.data._errors.length + ' errors!');
            for (var i = 0; i < res.data._errors.length; i++) $log.log(res.data._errors[i]);
          } else {
            // logged in!
            $rootScope.oauth = { access_token: res };
            $scope.loggedIn = true;
          }
        })
        .catch(function (err) {
          $log.error(err);
        });
    };

  }]);
