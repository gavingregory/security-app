angular.module('logApp')
  .factory('commentFactory', ['$http', function ($http) {
    return {
      list: function (id) {
        return $http.get('api/v1/events/'+ id +'/comments/');
      },
      create: function (id, data) {
        console.log(data);
        return $http.post('api/v1/events/'+ id +'/comments/', data);
      },
      get: function (id, comment_id) {
        return $http.get('api/v1/events/'+ id +'/comments/' + comment_id);
      },
      update: function (id, data) {
        return $http.put('api/v1/events/'+ id +'/comments/' + data._id, data);
      },
      delete: function (id, comment_id) {
        return $http.delete('api/v1/events/'+ id +'/comments/' + comment_id);
      },
    };
  }]);
