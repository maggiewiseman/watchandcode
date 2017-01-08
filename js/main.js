/* jshint devel: true, browser: true */
'use strict';
var todoList = {
  
  todos: [],
  
  init: function() {
    var templateString = $('#todo-list-hbt').html();
    this.htmlTemplate = Handlebars.compile(templateString); 
    view.bindEvents();
  },
 
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
    todoList.addTodo($('#new-todo').val());
    $("#new-todo").val('');
    view.render();
    
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
  createDeleteButton: function() {
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
  },
  bindEvents: function() {
    $('#new-todo').on('focusout', handler.add());
  },
  //view should take in the todos array
  //it should filter according to a filter property and return right list of todos
  //I need a template
  //compile a template
  //pass todos array to compiled template function
  render: function() {
    var htmlList = todoList.htmlTemplate(todoList.todos);
    $('#todo-list').html(htmlList);
    $('#new-todo').focus();
  }
};  //end view object

var util = {
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
    pluralize: function() {
      
    },
    store: function() {
      
    }
}; //end util object

todoList.init();

view.setUpEventListeners();

