(function(){

  angular
       .module('app')
       .controller('AuthController', [
          '$rootScope', '$interval', '$log', '$mdToast', 'authFactory',
          AuthController
       ]);

  function AuthController($rootScope, $interval, $log, $mdToast, authFactory) {
    var vm = this;

    /* Authentication */

    vm.login = function (username, password) {
      $log.log('something')
      authFactory.login({username: username, password: password})
        .then(function (res) {
          $log.log(authFactory.handleLogin(res));
        })
        .catch(function (err) {
          $log.error(err);
        });
    };
    vm.logout = function () {
      authFactory.handleLogout();
      $location.url('/'); // TODO: change this to state change
    };

    /* Check authentication status at a set interval */
    $interval(function () {
      if ($rootScope.authentication.logged_in) authFactory.ping()
        .then(function (res) {
          authFactory.handleGoodPing(res);
        })
        .catch(function (err) {
          authFactory.handleBadPing(err);
        });
    }, 10000);

  }

})();
