var todos = ["item1", "item2", "item3"];

function displayTodos() {
  for (var i=0; i < todos.length; i++) {
    console.log( todos[i]);
  }
  
}

function addTodo(item) {
  todos.push(item);
}

function changeTodo(num, newTodo) {
  if(todos[num]){
    todos[num] = newTodo;
    displayTodos();
  }else {
    console.log(num + "is an invalid number in your to do list.");
  }
}

//remember slice deletes after the number provided, so if they want to delete 2, tell slice to delete after 1
function deleteTodo(position) {
  if(todos[position]) {
    todos.splice(position, 1);
    displayTodos();
  } else {
    console.log(position + " is not on the list");
  }
}


displayTodos();
addTodo("copy tests");
changeTodo(1, "grade labs");
deleteTodo(2);


