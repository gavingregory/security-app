angular.module('logApp')
  .controller('globalCtrl', ['$log', '$scope', 'authFactory', 'eventFactory', 'localStorage', function ($log, $scope, authFactory, eventFactory, localStorage) {
    $scope.loggedIn = false;
    $scope.login = function (username, password) {
      authFactory.login({username: username, password: password})
        .then(function (res) {
          $log.log(authFactory.handleLogin(res));
        })
        .catch(function (err) {
          $log.error(err);
        });
    };

  }]);
