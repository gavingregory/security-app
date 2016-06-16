(function(){

  angular
       .module('app')
       .controller('AuthController', [
          '$state', '$interval', '$log', 'toastFactory', 'authFactory', 'localStorage',
          AuthController
       ]);

  function AuthController($state, $interval, $log, toastFactory, authFactory, localStorage) {
    var vm = this;
    vm.authentication = localStorage.getObject('authentication');
    vm.login = _login;
    vm.logout = _logout;

    /**
     * Handles the login procedure.
     * Attempts to login with the API using the username and password provided.
     * A successful response will be passed to handleLogin.
     */
    function _login(username, password) {
      authFactory.login({username: username, password: password})
        .then(function (res) {
          authFactory.handleLogin(res, vm);
        })
        .catch(function (err) {
          toastFactory.showSimpleToast('Unable to login with those credentials.');
        });
    };

    /**
     * Handles the logout procedure.
     * Clears all data from the authentication controller and sets the logged_in
     * flag to be false.
     */
    function _logout() {
      localStorage.setObject('authentication', { logged_in: false });
      vm.authentication = { logged_in:false };
      $state.go('home.dashboard');
    };

    /**
     * Pings the server at regular intervals to check authentication status.
     * if for any reason we are no longer authenticated, call the logout
     * function.
     */
    $interval(function () {
      if (vm.authentication.logged_in) authFactory.ping()
        .then(function (res) {
          // do nothing, we are authenticated!
        })
        .catch(function (res) {
            if (res.status === 401)
              vm.logout();
            else $log.error('Did not expect status ' + res.status);
        });
    }, 10000);

  }

})();
