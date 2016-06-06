angular.module('logApp')
  .factory('authFactory', ['$http', '$rootScope', 'localStorage', function ($http, $rootScope, localStorage) {
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
      }
    };
  }]);
