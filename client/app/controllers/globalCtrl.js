angular.module('logApp')
  .controller('globalCtrl', function ($scope, authFactory) {
    authFactory.login({username: 'user', password: 'password'})
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  });
