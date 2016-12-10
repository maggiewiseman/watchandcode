/* jshint devel: true, browser: true */
var todoList = {
  todos: [],
 
  addTodo: function(itemText) {
    this.todos.push({
      todoText: itemText,
      completed: false
    });
  },  
  changeTodo: function(num, newTodo) {
    
    if(this.todos[num]){
      this.todos[num].todoText = newTodo;
    }else {
      console.log(num + "is an invalid number in your to do list.");
    }
  },
  deleteTodo: function(position) {
      this.todos.splice(position, 1);
  },
  toggleCompleted: function(num) {
      this.todos[num].completed = !this.todos[num].completed;  
  },
  toggleAll: function() {
    var completedTodos = 0,
        totalTodos = this.todos.length;
    

    this.todos.forEach(function(todos){
      //Case 1: Is this todo complete? If yes, count it
      if(todos.completed) { 
        completedTodos++;
      }
    });
    
    //Case 1: Are ALL of the todos complete? If yes, set todo.complete to false
    if(completedTodos === totalTodos) {
      this.todos.forEach(function(todos){
        todos.completed = false;
      });
    //Case 2: At least 1 todo is incomplete, set all todo.complete to true  
    } else {
      this.todos.forEach(function(todos) {
        todos.completed = true;
      });
    }
  }
  
}; //end object

var handler = {
  
 
  add: function() {
    var addTextInput = document.getElementById("add-text");
    todoList.addTodo(addTextInput.value);
    addTextInput.value = "";
    view.display();
    
  },
  change: function() {
    var num = document.getElementById("change-num"),
        text = document.getElementById("change-text");
    todoList.changeTodo(num.value, text.value);
    num.value = "";
    text.value = "";
    view.display();
  },
  delete: function(position) {
    todoList.deleteTodo(position);
    view.display();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.display();
  },
  toggleCompleted: function(id) {
    todoList.toggleCompleted(id);
    view.display();
  }
};

 
var view = {
  display: function() {
    var ulElement = document.querySelector("ul");
    // clear out ul before the for loop runs so that the this run replaces rather than appends old run
    ulElement.innerHTML = "";
    
    todoList.todos.forEach(function(todo, position){
      var liElement = document.createElement("li");
      
      //string that will hold the text to be added to the li and displayed
      var todoTextWithCompletion = '';
     
      //Case 1: Is the todo completed? (todo.complete = true)
      if(todo.completed) {
          todoTextWithCompletion = "(x) " + todo.todoText;
      //Case 2: Todo is not completed
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText;
      }
      liElement.id = position;
      liElement.textContent = todoTextWithCompletion;
      liElement.appendChild(this.createDeleteButton());
      ulElement.appendChild(liElement);
    }, this);
  },
  createDeleteButton: function () {
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    return deleteBtn;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event) {
      console.log(event);
       //Case 1: Was delete button clicked?
       if(event.target.className === "delete-btn") {     
         handler.delete(parseInt(event.target.parentNode.id));
       }
       //Case 2: Was li text clicked? 
       if(event.target.tagName === "LI"){
         handler.toggleCompleted(parseInt(event.target.id));
       }

    });
  }
};  //end view object

view.setUpEventListeners();

