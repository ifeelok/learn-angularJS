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
        },
        requestError: function (rejection) {
          console.log('Request error due to ', rejection);
          //继续执行以确保promise链上下一环能够接收到错误信息
          return $q.reject(rejection);
        },
        response: function(response) {
          console.log('Response from server ', response);
          //返回promise对象
          return response || $q.when(response);
        },
        responseError: function(rejection) {
          console.log('Error in response', rejection);
          //继续执行以确保promise链上下一环能够接收到错误信息
          //如果有必要，可以检查错误状态吗
          //if(rejection.status == 403){
          //显示登陆对话框
          // 返回某个值告诉控制器错误情况已经被处理
          //}
          // 也可以调用reject函数进入promise错误处理链上的下一环
          return $q.reject(rejection);
        }
      };
    }])
    .config('$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('MyLoggingInterceptor');
    })
