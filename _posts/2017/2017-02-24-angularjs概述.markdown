---
layout: "post"
title: "AngularJS概述"
date: "2017-02-24 10:16"
---

AngularJS坚持着五条核心的信条，这让开发者能够迅速开发出大规模的复杂应用。
- 数据驱动(通过数据绑定实现)
- 声明
- 概念分离
- 依赖注入
- 测试

<!-- more -->

### 基础示例

```html
<!DOCTYPE html>
<html ng-app>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<h1>Hello {{1+1}}</h1>
		<script src="../angular.js" charset="utf-8"></script>
	</body>
</html>
```

**构建AngularJS的两个步骤：**

- 加载AngularJS源码
- 启动AngularJS

### Hello World

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello World</title>
  </head>
  <body ng-app>
    <input type="text"
           ng-model="name"
           placeholder="Enter Your Name">
    <h1>Hello <span ng-bind="name"></span></h1>
    <script src="../angular.js" charset="utf-8"></script>
  </body>
</html>
```

**和上一个例子的不同之处：**
- ng-app移动到body标签上
- ng-model
- ng-bind，和花括号表达式可以相互替换
