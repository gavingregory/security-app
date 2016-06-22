angular.module('logApp')
  .controller('CategoryListController', ['$scope', 'categoryFactory', 'toastFactory', function ($scope, categoryFactory, toastFactory) {

    categoryFactory.list().then(function(res){
      $scope.categories = res.data;
    }).catch(function(res){
      toastFactory.showSimpleToast('Unable to fetch categories.');
    });
  }]);
