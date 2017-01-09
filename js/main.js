/* jshint devel: true, browser: true, jquery: true */

'use strict';

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var todoList = {
  
  todos: [],
  completed: false,
  
  init: function() {
    var templateString = $('#todo-list-hbt').html();
    this.htmlTemplate = Handlebars.compile(templateString); 
    view.setUpEventListeners();
    this.filter = "all";
  },
 
  addTodo: function(itemText) {
    this.todos.push({
      id: util.uuid(),
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
    this.completed = !this.completed;
    for(var i = 0; i < this.todos.length; i++) {
      this.todos[i].completed = this.completed;
    }
    
//    var completedTodos = 0,
//        totalTodos = this.todos.length;
//    
//
//    this.todos.forEach(function(todos){
//      //Case 1: Is this todo complete? If yes, count it
//      if(todos.completed) { 
//        completedTodos++;
//      }
//    });
//    
//    //Case 1: Are ALL of the todos complete? If yes, set todo.complete to false
//    if(completedTodos === totalTodos) {
//      this.todos.forEach(function(todos){
//        todos.completed = false;
//      });
//    //Case 2: At least 1 todo is incomplete, set all todo.complete to true  
//    } else {
//      this.todos.forEach(function(todos) {
//        todos.completed = true;
//      });
//    }
  } //end toggle all
  
}; //end object

var handler = {
  
 
  add: function(e) {
    if(e.which === ENTER_KEY){
      todoList.addTodo($('#new-todo').val().trim());
      $("#new-todo").val('');
      view.render();
    }
  },
  change: function() {
    var num = document.getElementById("change-num"),
        text = document.getElementById("change-text");
    todoList.changeTodo(num.value, text.value);
    num.value = "";
    text.value = "";
    view.render();
  },
  getIndexOfEl: function(id) {
    for(var i = 0; i < todoList.todos.length; i++) {
      if(todoList.todos[i].id === id) {
        return i;
      }
    }
  },
  delete: function(id) {     
      var position = this.getIndexOfEl(id);
      todoList.deleteTodo(position);
      view.render();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.render();
  },
  toggleCompleted: function(event) {
//    var item = $(event.target.parentElement.nextElementSibling); 
//    item.toggleClass("completed-item");
    var id = event.target.id.substring(9,45);
    var index = this.getIndexOfEl(id);
    todoList.toggleCompleted(index);
    view.render();
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
  setUpEventListeners: function() {
    $('#new-todo').on('keyup', handler.add);
    $('#toggle-all').on('click', handler.toggleAll);
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event) {
      console.log(event);
       //Case 1: Was delete button clicked?
       if(event.target.className.indexOf("destroy") != -1) {     
         handler.delete(event.target.parentNode.id);
       }
       //Case 2: Was li text clicked? 
       if(event.target.type === "checkbox"){
        handler.toggleCompleted(event);
       }

    });
  },
  render: function() {
    if(todoList.completed) {
      $('#toggle-all').attr('checked', true);
    }
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

