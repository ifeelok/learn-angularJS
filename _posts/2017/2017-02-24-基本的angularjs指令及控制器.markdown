---
layout: "post"
title: "基本的AngularJS指令及控制器"
date: "2017-02-24 10:35"
---

探索模块和控制器，创建自定义的控制器。

<!-- more -->

### AngularJS模块

AngularJS将相关的代码封装起来，通过某种命令方法进行调用。

**模块包含两个部分：**
- 模块可以定义自己的控制器、服务、工厂类和指令。这些代码或者函数在整个模块都可以访问到。
- 模块也可以依赖其他模块，这些依赖在模块实例化时就已经定义完毕。

模块的功能不仅是用于包含相关的javascript代码，还用来启动应用。

**定义模块**

```javascript
angular.module('notesApp', []);
angular.module('notesApp', ['notesApp.ui', 'thirdCompany.fusioncharts']);
```

> 第一个参数是指模块名称，第二个参数表示该模块所依赖的模块名称列表。

**加载模块**

```javascript
angular.module('notesApp')
```

> 这行代码会通知AngularJS去查找名为`notesApp`的模块，并确保我们能够在当前文件中使用，增加或者修改该模块。

**例子**

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Hello AngularJS</title>
  </head>
  <body>
    Hello {{1+1}}nd time AngularJS
    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', []);
    </script>
  </body>
</html>
```
### 创建自定义控制器

控制器的主要职责：

- 从服务器获取数据以生成页面UI
- 决定哪些数据呈现给用户
- 一些与页面相关的逻辑，如何显示元素等
- 用户交互

控制器通常是和某个视图相关联的。不会游离于UI之外，否则可以用服务实现。

**创建控制器**

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Hello AngularJS</title>
  </head>
  <body ng-controller="MainCtrl">
    Hello {{1+1}}nd time AngularJS
    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', [])
        .controller('MainCtrl', [function() {
          console.log('MainCtrl has been created');
        }]);
    </script>
  </body>
</html>
```

> controller函数中的第一个参数表示该控制器的名称，第二个参数是一个数组。这个数组以字符串的格式包含了控制器所依赖的模块名称，最后的一个参数是控制函数。

**控制器的应用**

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Notes App</title>
  </head>
  <body ng-controller="MainCtrl as ctr">
    {{ctr.helloMsg}} AngularJS
    <br>
    {{ctr.goodbyeMsg}} AngularJS
    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', [])
        .controller('MainCtrl', [function () {
          this.helloMsg = 'Hello';
          this.goodbyeMsg = 'goodBye';
        }])
    </script>
  </body>
</html>
```

**$scope VS controllerAs语法**

> AngularJS1.2版本之后，使用`controllerAs`语法，只要使用`this`关键字就能将变量定义成控制器的成员变量。结构更清晰。

**controller示例**

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Notes App</title>
  </head>
  <body ng-controller="MainCtrl as ctrl">
    {{ctrl.message}} AngularJS
    <button type="button" ng-click="ctrl.changeMessage()">
      Change message
    </button>

    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', [])
        .controller('MainCtrl', [function() {
          var self = this;
          self.message = 'Hello';
          self.changeMessage = function () {
            self.message = 'goodBye';
          }
        }]);
    </script>
  </body>
</html>
```

*注意*
- 更新页面时，控制器并不能直接控制视图或者任何一个dom元素。
- 将一部分dom和控制器、函数以及变量关联起来，除此之外不多做任何多余的事情。

**javascript中this关键字**

> javascript中，函数中的this可以被任何调用该函数的对象重写。
> 为了解决这个问题，应该在控制器中设置一个代理变量(比如`self`变量)指向控制器实例，从而保证访问到的对象是正确的。

### 数组的操作和显示

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Notes App</title>
  </head>
  <body ng-controller="MainCtrl as ctrl">

    <div ng-repeat="note in ctrl.notes">
      <span class="label">{{note.label}}</span>
      <span class="status" ng-bind="note.done"></span>
    </div>

    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', [])
        .controller('MainCtrl', [function () {
          var self = this;
          this.notes = [
            {id: 1, label: 'First note', done: false},
            {id: 2, label: 'Second note', done: false},
            {id: 3, label: 'Done note', done: true},
            {id: 4, label: 'Last note', done: false},
          ];
        }]);
    </script>
  </body>
</html>
```
> 包含ng-repeat指令的那个元素成为模板，AngularJS加载该模板并产生一份副本，对于每一个实例采用相同操作。

**ng-bind和花括号表达式**

> ng-bind和花括号相比可以省下一些时间，在AngularJS启动时将HTML的花括号转化成ng-bind的时间。

**等待AngularJS加载完毕**

> ng-cloak指令可以在AngularJS启动到加载完毕之间的时间段内隐藏掉一些元素。
> ng-cloak使用CSS定义，在加载AngularJS时自动加载。
> 如果要隐藏某些元素可以将其`class`设置成`ng-cloak`。
> ng-cloak的CSS是angular.js的一部分，需要在`head`部分加载，最好的做法是添加自己的CSS，并确保最先加载。

```css
[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak],
  .ng-cloak, .x-ng-cloak {
    display: none !important;
  }
```

**AngularJS背后的处理**

- 加载HTML并获取其中所引用的脚本文件
- 加载HTML的document后，查找ng-app指令
- 加载指定模块并与相关元素关联
- 在ng-app对应的根节点和子节点兆指令和数据绑定预计
- 找到ng-controller和ng-repeat时，都会创建一个作用域(scope)作为相应元素的上下文(context)，它将决定dom可以访问到的函数和变量
- 为HTML能够访问到的变量添加监视器(watcher)和侦听器(listener)。值变化时立即更改
- AngularJS优化了检查数据是否变化的算法，只针对了某些特定的可能导致数据或者模型变化的UI时间。比如XHR(XMLHttpRequest)，服务器访问，页面加载，单击事件等。

*注意*

> 每一个ng-repeat的实例都有自己独有的作用域，同时都能访问父作用域。

### 更多指令

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Notes App</title>
    <style media="screen">
      .done {
        background-color: green;
      }
      .pending {
        background-color: red;
      }
    </style>
  </head>
  <body ng-controller="MainCtrl as ctrl">
    <div ng-repeat="note in ctrl.notes" ng-class="ctrl.getNoteClass(note.done)">
      <span class="label">{{note.label}}</span>
      <span class="assignee" ng-show="note.assignee" ng-bind="note.assignee"></span>
    </div>

    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp',[])
        .controller('MainCtrl', [function () {
          var self = this;
          this.notes = [
            {label: 'First Note', done: false, assignee: 'Shyam'},
            {label: 'Second Note', done: false},
            {label: 'Third Note', done: true},
            {label: 'Last Note', done: false, assignee: 'Brad'}
          ];
          self.getNoteClass = function (status) {
            return {
              done: status,
              pending: !status
            }
          };
        }]);
    </script>
  </body>
</html>
```

**ng-show**

> AngularJS有两条指令用于显示或者隐藏HTML元素，ng-show和ng-hide。

**ng-class**

> 该指令用于选择性的从HTML元素中添加或者删除CSS class。可以接收一个字符串或者一个对象。

### ng-repeat的应用

**ng-repeat不仅可以用来显示一组HTML元素，还可以显示一个对象所有的属性名和属性值**

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Notes App</title>
  </head>
  <body ng-controller="MainCtrl as ctrl">
    <div ng-repeat="(author, note) in ctrl.notes">
      <span>{{note.label}}</span>
      <span ng-bind="author"></span>
    </div>
    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', [])
        .controller('MainCtrl', [function () {
          var self = this;
          self.notes = {
            shyam: {
              id: 1,
              label: 'First Note',
              done: false
            },
            Misko: {
              id: 3,
              label: 'Finished Third Note',
              done: true
            },
            brad: {
              id: 2,
              label: 'Second Note',
              done: false
            }
          }
        }]);
    </script>
  </body>
</html>
```

> ng-repeat指令能接受类似"variable in arrayExpression"或者"(key, value) in objectExpression"这些格式的参数。

**ng-repeat也可以为HTML模板提供了一些通用的辅助变量来查询当前作用域中的一些常用信息**

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Notes App</title>
  </head>
  <body ng-controller="MainCtrl as ctrl">
    <div ng-repeat="note in ctrl.notes">
      <div>First Element: {{$first}}</div>
      <div>Middle Element: {{$middle}}</div>
      <div>Last Element: {{$last}}</div>
      <div>Index Element: {{$index}}</div>
      <div>At Even Element: {{$even}}</div>
      <div>At Odd Element: {{$odd}}</div>

      <span>{{note.label}}</span>
      <span>{{note.done}}</span>
      <br><br>
    </div>
    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', [])
        .controller('MainCtrl', [function() {
          var self = this;
          self.notes = [
            {id: 1, label: 'First Note', done: false},
            {id: 2, label: 'Second Note', done: false},
            {id: 3, label: 'Third Note', done: true},
            {id: 4, label: 'Last Note', done: false},
          ]
        }])
    </script>
  </body>
</html>
```

> 每一个以`$`为前缀的变量都是AngularJS内置的，它可以提供当前元素的某些统计信息。

**根据id判断重复性**

> 默认情况下，ng-repeat为每一个记录创建一个新的dom元素，为了优化性能，当记录重复时，它能缓存或者重用已有的dom。
> 判断是否重复的依据是AngularJS计算出的`hash`值。
> 某些情况下，即使对象的`hash`值不同，我们也希望可以重用一个dom

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Notes App</title>
  </head>
  <body ng-controller="MainCtrl as ctrl">

    <button ng-click="ctrl.changeNotes()">Change Notes</button>
    <br>
    DOM Elements change every time some clicks
    <div ng-repeat="note in ctrl.notes1">
      {{note.$$hashKey}}
      <span>{{note.label}}</span>
      <span>{{note.done}}</span>
      <br>
    </div>

    DOM Element are reused every time someone clicks
    <div ng-repeat="note in ctrl.notes2 track by note.id">
      {{note.$$hashKey}}
      <span>{{note.label}}</span>
      <span>{{note.done}}</span>
    </div>

    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', [])
        .controller('MainCtrl', [function() {
          var self = this;
          var notes = [
            {id: 1,label: 'First Note',done: false,someRandom: 31431},
            {id: 2,label: 'Second Note',done: false},
            {id: 3,label: 'Finished Third Note',done: true},
          ];
          self.notes1 = angular.copy(notes);
          self.notes2 = angular.copy(notes);
          self.changeNotes = function () {
            notes = [
              {id: 1,label: 'Changed Note',done: false,someRandom: 4242},
              {id: 2,label: 'Second Note',done: false},
              {id: 3,label: 'Finished Third Note',done: true},
            ];
            self.notes1 = angular.copy(notes);
            self.notes2 = angular.copy(notes);
          };
        }]);
    </script>
  </body>
</html>
```
*注意*
> 不要在应用中定义以`$$`开头的变量。AngularJS会以`$$`开头的变量定义私有成员。

**跨HTMl元素的ng-repeat**

```html
<!DOCTYPE html>
<html ng-app="notesApp">
  <head>
    <meta charset="utf-8">
    <title>Notes App</title>
  </head>
  <body ng-controller="MainCtrl as ctrl">
    <table>
      <tr ng-repeat-start="note in ctrl.notes">
        <td>{{note.label}}</td>
      </tr>
      <tr ng-repeat-end>
        <td>Done: {{note.done}}</td>
      </tr>
    </table>

    <script src="../angular.js" charset="utf-8"></script>
    <script type="text/javascript">
      angular.module('notesApp', [])
        .controller('MainCtrl', function() {
          var self = this;
          this.notes= [
            {id: 1,label: 'First Note',done: false,},
            {id: 2,label: 'Second Note',done: false},
            {id: 3,label: 'Finished Third Note',done: true},
          ];
        });
    </script>
  </body>
</html>
```
