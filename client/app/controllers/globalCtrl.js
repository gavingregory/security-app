angular.module('logApp')
  .controller('globalCtrl', ['$location', '$log', '$scope', 'siteFactory', 'authFactory', 'eventFactory', 'localStorage', function ($location, $log, $scope, siteFactory, authFactory, eventFactory, localStorage) {
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
    $scope.logout = function () {
      authFactory.handleLogout();
      $location.url('/');
    };
  }]);
