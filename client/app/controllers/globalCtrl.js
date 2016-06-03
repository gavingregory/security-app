angular.module('logApp')
  .controller('globalCtrl', function ($rootScope, $scope, authFactory, eventFactory) {
    $rootScope.oauth = {access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwicGFzc3dvcmQiOiIkMmEkMTAkNmViYk5DMzlpalN5d3RxWFhMa0pYdTU1S0N4UHFRRDBDbUEzcS5PNHJkMFJFaDVtLkYuQzIiLCJleHBpcnkiOjE0NjUwNjU2NDg4Mjl9.OQzxlDGqb9yyDe_-geYO0H1-Cfu8t9bHUUo7TYGbQEs'};

    eventFactory.list()
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.error(err);
      });
    // authFactory.login({username: 'user', password: 'password'})
    //   .then(function (data) {
    //     console.log(data);
    //   })
    //   .catch(function (err) {
    //     console.error(err);
    //   });
  });
