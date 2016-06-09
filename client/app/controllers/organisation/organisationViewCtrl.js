angular.module('logApp')
  .controller('organisationViewCtrl', ['$scope', 'organisationFactory', function ($scope, organisationFactory) {
    $scope.organisation = {};
    organisationFactory.get()
      .then(function (resp) {
        $scope.organisation = resp.data;
      })
      .catch(function (resp) {
        console.error(resp);
      });
  }]);
