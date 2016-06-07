angular.module('logApp')
  .controller('globalCtrl', ['$interval', '$location', '$log', '$scope', 'siteFactory', 'authFactory', 'eventFactory', 'localStorage', function ($interval, $location, $log, $scope, siteFactory, authFactory, eventFactory, localStorage) {

    /* Authentication */

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

    /* Check authentication status at a set interval */
    $interval(function () {
      if ($scope.authentication.logged_in) authFactory.ping()
        .then(function (res) {
          authFactory.handleGoodPing(res);
        })
        .catch(function (err) {
          authFactory.handleBadPing(err);
        });
    }, 10000);
  }]);
