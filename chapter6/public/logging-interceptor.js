angular.module('notesApp', [])
  .controller('MainCtrl', ['$http', function ($http) {
    var self = this;
    self.items = [];

    self.newTodo = {};
    var fetchTodos = function () {
      return $http.get('/api/note').then(function (resposne) {
        self.items = resposne.data;
      }, function (errResponse) {
        console.log('Error while fetching notes');
      });
    };

    fetchTodos();

    self.add = function(){
      $http.post('/api/note', self.newTodo)
        .then(fetchTodos)
        .then(function (resposne) {
          self.newTodo = {}
        });
    };
  }])
    .factory('MyLoggingInterceptor', ['$q', function ($q) {
      return {
        request: function (config) {
          console.log('Reques made with ', config);
          return config;
          //如果发生错误或者未满足要求，可以直接调用
          //$q.reject('Not allowed')
        }
      }
    }])
