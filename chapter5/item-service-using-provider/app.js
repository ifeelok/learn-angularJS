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
