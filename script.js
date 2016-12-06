function Todos(item) {
  this.item = [item];
  this.display = function() {
    for(var i = 0; i < this.item.length; i++) {
      console.log(this.item[i]);
    }
  };
  this.get = function() { return this.item;};
  this.set = function(item) {
    this.item.push(item);
  };
}

class TodoList extends Todos {
  constructor(item){
    super(item);
    this.name = "list";
  }
}
var myTodo = new Todos("practice coding");

myTodo.display();
console.log(myTodo.get());
myTodo.set("update blackboard tonight");
myTodo.display();

var myList = new TodoList("go to store");
myList.display();