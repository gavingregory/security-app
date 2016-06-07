angular.module('logApp')
  .factory('authFactory', ['$http', '$rootScope', '$log', 'localStorage', function ($http, $rootScope, $log, localStorage) {
    return {
      // API access
      login: function (data) {
        return $http.post('api/v1/auth/login', data);
      },
      logout: function () {
        return $http.get('api/v1/auth/logout');
      },
      passwordReset: function (data) {
        return $http.post('api/v1/auth/passwordreset', data);
      },
      status: function () {
        return $http.post('api/v1/auth/status');
      },
      ping: function () {
        return $http.head('api/v1/auth/status');
      },

      /**
       * Handles a response object from the server, and determines whether
       * authentication was successful or not. Correctly stores auth
       * information in localStorage and $rootScope.
       * @param {object} data - The http response object.
       */
      handleLogin: function (res) {
        if (!res) throw 'No response object.';
        var auth = localStorage.getObject('authentication');

        if (typeof(res.data) === 'object' && res.data._errors && res.data._errors.length) {
          handleLogout();
          $rootScope.authentication = { logged_in:false };
          return false;
        } else {
          // logged in!
          auth.access_token = res.data;
          auth.logged_in = true;
          $rootScope.authentication = auth;
          localStorage.setObject('authentication', auth);
          return true;
        }
      },

      /**
       * Handles the all logout functionality on local store.
       * Clears all data from $rootScope and sets the logged_in flag
       * to be false.
       */
      handleLogout: function () {
        localStorage.setObject('authentication', { logged_in: false });
        $rootScope.authentication = { logged_in:false };
      },

      /**
       * Handles the status ping response and updates the authentication object
       * if required (ie log out if we are no longer authenticated).
       */
      handleGoodPing: function (res) {
        if (res.status!== 200) $log.error('Did not expect status ' + res.status);
      },

      handleBadPing: function (err) {
        if (err.status === 401)
          $rootScope.authentication = {logged_in: false};
        else $log.error('Did not expect status ' + res.status);
      }
    };
  }]);
