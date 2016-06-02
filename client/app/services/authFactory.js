angular.module('logApp')
  .factory('authFactory', function ($http) {
    return {
      login: function (data) {
        return $http.post('api/v1/auth/login', data);
      },
      logout: function () {
        return $http.get('api/v1/auth/logout');
      },
      passwordReset: function (data) {
        return $http.post('api/v1/auth/passwordreset', data);
      }
    };
  });
