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
    //count completed todos and total todos
    for (var i = 0; i < this.todos.length; i++) {
        if(this.todos[i].completed) { //completed is true so count it
          completedTodos++;
        }
    }
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
    // clear out ul before the for loop runs
    ulElement.innerHTML = "";
    
    for(var i = 0; i < todoList.todos.length; i++) {  
      var liElement = document.createElement("li");
      var todoTextWithCompletion = '';
      if(todoList.todos[i].completed) {
          todoTextWithCompletion = "(x) " + todoList.todos[i].todoText;
        } else {
          todoTextWithCompletion = "( ) " + todoList.todos[i].todoText;
        }
      liElement.id = i;
      liElement.textContent = todoTextWithCompletion;
      liElement.appendChild(this.createDeleteButton());
      ulElement.appendChild(liElement);
    }
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
       //check to see if item clicked was delete button or the checkbox/item
       if(event.target.className === "delete-btn") {     
         handler.delete(parseInt(event.target.parentNode.id));
       }
       if(event.target.tagName === "LI"){
         handler.toggleCompleted(parseInt(event.target.id));
       }

    });
  }
};  //end view object

view.setUpEventListeners();

