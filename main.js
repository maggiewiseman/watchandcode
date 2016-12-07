
var todoList = {
  todos: [],
  displayTodos: function() {
    if (this.todos.length === 0) {
      console.log("you have no items on your list!");
    } else {
      for (var i = 0; i < this.todos.length; i++) {
        var item = this.todos[i];
        if(item.completed) {
          console.log("(x) ", item.todoText);
        } else {
          console.log("( ) ", item.todoText);
        }
      }
    }
  },
  addTodo: function(itemText) {
    this.todos.push({
      todoText: itemText,
      completed: false
    });
    this.displayTodos();
  }, 
  changeTodo: function(num, newTodo) {
    if(this.todos[num]){
      this.todos[num].todoText = newTodo;
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
  },
  toggleCompleted: function(num) {
    this.todos[num].completed = !this.todos[num].completed;
    this.displayTodos();
  },
  toggleAll: function() {
    var completedTodos = 0,
        totalTodos = this.todos.length;
    //count completed todos and total todos
    for (var i = 0; i < this.todos.length; i++) {
        if(this.todos[i].completed) { //completed is true so count it
          completedTodos++;
        }
    }
    console.log("completed todos: ", completedTodos);
    if(completedTodos === totalTodos) {
      //toggle all to false (remove check)
      for (var j = 0; j < this.todos.length; j++) {
        this.todos[j].completed = false;
      }
    } else {
      //toggle all to true (add check)
      for (var k = 0; k < this.todos.length; k++) {
        this.todos[k].completed = true;
      }
    }
    this.displayTodos();
  }
  
}; //end object




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


