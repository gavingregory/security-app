angular.module('logApp')
  .controller('SiteListController', ['$scope', 'siteFactory', function ($scope, siteFactory) {

        siteFactory.list().then(function(data){
          $scope.sites = data.data;
        }). catch( function( err ){
          console.log(err);
        });
  }]);
