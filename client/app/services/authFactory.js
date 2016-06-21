angular.module('logApp')
  .factory('authFactory', ['$http', '$log', 'localStorage', function ($http, $log, localStorage) {
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
       * information in localStorage and the authentication controller.
       * @param {object} data - The http response object.
       * @param {object} vm - The auth controller view model.
       */
      handleLogin: function (res, vm, onLogout) {
        if (!res) throw 'No response object.';
        var auth = localStorage.getObject('authentication');

        if (typeof(res.data) === 'object' && res.data._errors && res.data._errors.length) {
          onLogout();
          vm.authentication = { logged_in:false };
          return false;
        } else {
          // logged in!
          auth.access_token = res.data.access_token;
          auth.name = res.data.name;
          auth.logged_in = true;
          vm.authentication = auth;
          localStorage.setObject('authentication', auth);
          return true;
        }
      }
    };
  }]);
