
var todoList = {
  todos: ["item1", "item2", "item3"],
  displayTodos: function() {
    console.log('My Todos: ', this.todos);
  },
  addTodo: function(item) {
    this.todos.push(item);
    this.displayTodos();
  }, 
  changeTodo: function(num, newTodo) {
    if(this.todos[num]){
      this.todos[num] = newTodo;
      this.displayTodos();
    }else {
      console.log(num + "is an invalid number in your to do list.");
    }
  },
  deleteTodo: function(position) {
    if(this.todos[position]) {
      this.todos.splice(position, 1);
      this.displayTodos();
    } else {
      console.log(position + " is not on the list");
    }
  }
  
};



////remember slice deletes after the number provided, so if they want to delete 2, tell slice to delete after 1
//function deleteTodo(position) {
//  
//}
//
//
//displayTodos();
//addTodo("copy tests");
//changeTodo(1, "grade labs");
//deleteTodo(2);


