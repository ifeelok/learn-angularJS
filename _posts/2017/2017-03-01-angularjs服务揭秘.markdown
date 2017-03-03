---
layout: "post"
title: "AngularJS服务揭秘"
date: "2017-03-01 15:14"
---

了解一些核心的内置服务。

<!-- more -->

### AngularJS服务

指的是一些函数或者对象，他们可以在整个应用中持有某些行为和状态。每一个服务只有一个实例，无论从应用中何处访问该服务，指向的都是同一个对象。

> 在AngularJS中提到"服务"，一般指的是一个概念上的服务——在整个应用中可以共享的可重用API或者可替代对象。AngularJS中的服务可能有以下实现形式:工厂类、服务或者提供器(provider)。

### 为什么要使用服务

控制器是有状态的，不过不稳定，在一个单页面应用中进行页面迁移时，他们可能会被多次销毁和重建。

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Note App</title>
    <script src="../../angular.js" charset="utf-8"></script>
    <script src="app.js" charset="utf-8"></script>
  </head>
  <body ng-controller="MainCtrl as mainCtrl">
    <h1>Hello Controllers</h1>
    <button type="button" name="button" ng-click="mainCtrl.open('first')">Open first</button>
    <button type="button" name="button" ng-click="mainCtrl.open('second')">Open second</button>
    <div ng-switch on="mainCtrl.tab">
      <div ng-switch-when="first">
        <div ng-controller="SubCtrl as ctrl">
          <h3>First tab</h3>
          <ul>
            <li ng-repeat="item in ctrl.list">
              <span ng-bind="item.label"></span>
            </li>
          </ul>
          <button type="button" name="button" ng-click="ctrl.add()">Add More Items</button>
        </div>
      </div>
      <div ng-switch-when="second">
        <div ng-controller="SubCtrl as ctrl">
          <h3>Second tab</h3>
          <ul>
            <li ng-repeat="item in ctrl.list">
              <span ng-bind="item.label"></span>
            </li>
          </ul>
          <button type="button" name="button" ng-click="ctrl.add()">Add More Items</button>
        </div>
      </div>
    </div>
  </body>
</html>
```

```javascript
angular.module('notesApp', [])
  .controller('MainCtrl', [function () {
    var self = this;
    self.open = function (tab) {
      self.tab = tab;
    };
  }])
  .controller('SubCtrl', [function () {
    var self = this;
    self.list = [
      {id: 1, label: 'Item0'},
      {id: 2, label: 'Item1'}
    ];
    self.add = function() {
      self.list.push({id: self.list.length + 1, label: 'Item' + self.list.length})
    };
  }])
```

注意`ng-switch`的用法，和HTML中的switch类似。

### 服务和控制器

服务器和控制器的不同职责

| 控制器          | 服务器     |
| :-------------  | :------------- |
| 表现层逻辑       | 业务层逻辑      |
| 和视图直接相关   | 独立于页面      |
| 驱动UI          | 驱动应用        |
| 一次性的         | 可重用的      |
| 决定如何获取数据，显示哪些数据，如何进行用户交互，展示UI样式      | 决定如何调用服务端口，常见的验证逻辑，应用级别的数据存储，可重用的业务逻辑      |

### AngularJS的依赖注入

AngularJS中的服务非常依赖于它的依赖注入系统。任何已有的服务都能通过将它定义成一种依赖注入到其它服务、指令或者控制器中。

依赖注入仅声明服务，注入器(injector)负责创建依赖并将它传入。

服务在应用范围内是单例模式。

### 使用内置服务

$log服务的使用

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Notes App</title>
  </head>
  <body ng-controller="MainCtrl as ctrl">
    <h1>Hello Service</h1>
    <button type="button" name="button" ng-click="ctrl.logStuff()">Log something</button>

    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', [])
        .controller('MainCtrl', ['$log' ,function ($log) {
          var self = this;
          self.logStuff = function() {
            $log.log('The button was pressed')
          };
        }]);
    </script>
  </body>
</html>
```

AngularJS会读取数组中所有的字符串，在内置服务中查找与它们匹配的服务，然后按照定义顺序将它们注入到对应的函数中。

### 注入顺序

```javascript
myModule.controller('MainCtrl', ['$log', '$window', function($l, $w) {

}]);
```

`$log`服务被注入函数的`$l`变量，`$window`服务被注入`$w`变量。

### 常见的服务

*$window*

封装了全局的window对象。存在的意义:避免使用全局状态，尤其是在测试中。

*$location*

让用户可以与浏览器地址栏中的url进行交互，读取或者操作它的值。提供了以下函数操作URl:
- absUrl

> 这个一个get函数，返回地址栏中的URL。

- url

> 既是get函数，也是set函数，用于操作URL。传参则设置，不传参则获取。

- path

> 它也兼有get和set功能，用于操作URL路径。它会自动在开头加上`/`。`$location.path()`返回当前应用路径，`$location.path('/new')`将路径设置为`/new`。

- search

> 设置或者获取当前URL的查询字符串。无参的`$location.search()`以对象形式返回查询字符串，`$location.search('test')`删除了test参数及其对应的值，而`$location.search('test', 'abc')`则将test参数的值设置成abc。

- $http

> 它是AngularJS中的核心服务，用于创建XHR从应用中向服务器端发送请求。

### 创建自定义服务

如果满足以下标准中的任意一条，可以考虑创建一个AngularJS服务，而不是将功能写到控制器中。

*可重用性*
> 不止一个控制器或者服务可能会用到它所事项的某个具体函数。

*应用级别的状态*
> 控制器在某些情况下会销毁/重建，如果我们需要在整个应用中保存状态，那么就应该使用服务而不是控制器。

*与视图无关*

*需要与第三方服务整合*
> 有时需要与第三方服务整合(如SocketIO，BreezeJS等)

*缓存/工厂类*

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Note App</title>
    <script src="../../angular.js" charset="utf-8"></script>
    <script src="app.js" charset="utf-8"></script>
  </head>
  <body ng-controller="MainCtrl as mainCtrl">
    <h1>Hello Controllers</h1>
    <button type="button" name="button" ng-click="mainCtrl.open('first')">Open first</button>
    <button type="button" name="button" ng-click="mainCtrl.open('second')">Open second</button>
    <div ng-switch on="mainCtrl.tab">
      <div ng-switch-when="first">
        <div ng-controller="SubCtrl as ctrl">
          <h3>First tab</h3>
          <ul>
            <li ng-repeat="item in ctrl.list()">
              <span ng-bind="item.label"></span>
            </li>
          </ul>
          <button type="button" name="button" ng-click="ctrl.add()">Add More Items</button>
        </div>
      </div>
      <div ng-switch-when="second">
        <div ng-controller="SubCtrl as ctrl">
          <h3>Second tab</h3>
          <ul>
            <li ng-repeat="item in ctrl.list()">
              <span ng-bind="item.label"></span>
            </li>
          </ul>
          <button type="button" name="button" ng-click="ctrl.add()">Add More Items</button>
        </div>
      </div>
    </div>
  </body>
</html>
```

```javascript
angular.module('notesApp', [])
  .controller('MainCtrl', [function () {
    var self = this;
    self.tab = 'first';
    self.open = function (tab) {
      self.tab = tab;
    };
  }])
  .controller('SubCtrl', ['ItemService' ,function (ItemService) {
    var self = this;
    self.list = function() {
      return ItemService.list();
    };
    self.add = function() {
      ItemService.add({id: self.list().length + 1, label: 'Item' + self.list().length});
    };
  }])
  .factory('ItemService', [function() {
    var items = [
      {id: 1, label: 'Item0'},
      {id: 2, label: 'Item1'}
    ];
    return {
      list: function () {
        return items;
      },
      add: function (item) {
        items.push(item);
      }
    }
  }]);
```

通过`angular.module.factory`函数创建ItemService：

- factory函数的定义方式和控制器非常相似。
- 在定义函数的服务中需要讲一个对象作为返回值，这些函数会成为服务的API。
- 服务中的局部变量无法在外部直接访问。

### 工厂类、服务、提供器的区别

AngularJS提供了一系列不同的方式来创建并注册服务，用户可以根据各自喜好和编程风格自行选择。

*使用service()函数改写服务的定义方式*

```javascript
angular.module('notesApp', [])
  //第二个参数为一个列表，列表中最后一个元素是函数
  .service('ItemService', [ItemService])
  .controller('MainCtrl', [function () {
    var self = this;
    self.tab = 'first';
    self.open = function (tab) {
      self.tab = tab;
    };
  }])
  .controller('SubCtrl', ['ItemService' ,function (ItemService) {
    var self = this;
    self.list = function() {
      return ItemService.list();
    };
    self.add = function() {
      ItemService.add({id: self.list().length + 1, label: 'Item' + self.list().length});
    };
  }]);

function ItemService() {
  var items = [
    {id: 1, label: 'Item0'},
    {id: 2, label: 'Item1'}
  ];
  this.list = function () {
    return items;
  };
  this.add = function (item) {
    items.push(item);
  };
}
```

- 服务的定义函数是一个javascript类函数，没有任何返回值。
- 服务在它的实例上(通过this关键字)定义了一系列共有的API。
- 服务中的私有状态被定义成了函数中的局部变量。
- AngularJS会调用new ItemService()，然后将这个实例返回给所有依赖于ItemService的地方。

*使用provider函数。并不常用，但是当我们需要在应用加载之前对服务进行某些配置时，它会变得格外有用。*

```javascript
angular.module('notesApp', [])
  .provider('ItemService', function() {
    var haveDefaultItems = true;

    this.disableDefaultItems = function () {
      haveDefaultItems = false;
    };
    //用于获取依赖模块的是下面的函数，而不是上面的提供器
    this.$get = [function () {
      var opt_items = [];
      if (haveDefaultItems){
        opt_items = [
          {id: 1, label: 'Item0'},
          {id: 2, label: 'Item1'}
        ];
      }
      return new ItemService(opt_items);
    }];
  })
  .config(['ItemServiceProvider', function (ItemServiceProvider) {
    var shouldHaveDefaults = false;
    if(!shouldHaveDefaults){
      ItemServiceProvider.disableDefaultItems();
    }
  }])
  .controller('MainCtrl', [function () {
    var self = this;
    self.tab = 'first';
    self.open = function (tab) {
      self.tab = tab;
    };
  }])
  .controller('SubCtrl', ['ItemService' ,function (ItemService) {
    var self = this;
    self.list = function() {
      return ItemService.list();
    };
    self.add = function() {
      ItemService.add({id: self.list().length + 1, label: 'Item' + self.list().length});
    };
  }]);

function ItemService(opt_items) {
  var items = opt_items || [];
  this.list = function () {
    return items;
  };
  this.add = function (item) {
    items.push(item);
  };
}
```

- provider和factory和service都不相同，它不需要数组作为第二个参数，因为它不依赖于任何其他服务。
- provider还在它的实例上定义了$get函数，当服务需要被初始化时，这个函数就会被调用。此时，他就能使用在配置阶段设置的状态来初始化服务了。

config函数：

- config函数会在AngularJS应用加载之前执行，执行顺序在控制器、服务以及其它函数之前。
- 依赖注入方式是一样的，不过它还会注入提供者。
- 注入提供者之后，就能调用它所有的函数并设置值。
- 还能用来设置应用的URL终端、语言信息、路由配置等。
