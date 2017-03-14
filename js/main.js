/* jshint devel: true, browser: true, jquery: true */

'use strict';

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

var todoList = {

  //completed: false,
  init: function() {
    this.todos = util.store('todos');
		//gets script from index.html and turns it into a string.
    var templateString = $('#todo-list-hbt').html();
    this.htmlTemplate = Handlebars.compile(templateString); 
    view.setUpEventListeners();
    this.filter = "/all";
    handler.setUpRouter();
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
    //check to see if all todos are already complete
    //need to build filterTodos then check to see of active todos is 0 and completed todos >0
    
  },
  toggleAll: function(e) {
    var isChecked = $(e.target).prop('checked');
    todoList.todos.forEach(function(item){
      item.completed = isChecked;
    });

  }, //end toggle all

  getFilteredTodos: function() {
    if(this.filter === 'all'){
      return this.todos;
    }
    if(this.filter === 'active') {
      return this.getActiveTodos();
    }
    if(this.filter === 'completed') {
      return this.getCompletedTodos();
    }
  },
  getActiveTodos: function() {
    return this.todos.filter(function(item){
      if(!item.completed) {
        return item;
      } 
    });
  },
  getCompletedTodos: function() {
    return this.todos.filter(function(item) {
      if(item.completed) {
        return item;
      }
    });
  }
  
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
  toggleAll: function(e) {
    todoList.toggleAll(e);
    view.render();
  },
  toggleCompleted: function(event) {
    var id = event.target.id.substring(9,45);
    var index = this.getIndexOfEl(id);
    todoList.toggleCompleted(index);
    view.render();
  },
  clearCompleted: function() {
    todoList.todos = todoList.getActiveTodos();
    view.render();
  },
  routes: {
    '/all': function(){
      console.log('routed to all!');
      todoList.filter = 'all';
      view.render();
    },
    '/active': function(){
      console.log('routed to active!');
      todoList.filter = 'active';
      view.render();
    },
    '/completed': function(){
      console.log('routed to completed!');
      todoList.filter = 'completed';
      view.render();
    },
    //'/clear': todoList.deleteCompleted;
  },
  setUpRouter: function(){
    var router = Router(this.routes);
    router.init('/all');
  }
};

 
var view = {
  setUpEventListeners: function() {
    $('#new-todo').on('keyup', handler.add);
    $('#toggle-all').on('change', handler.toggleAll);
    $('#clear-completed').on('click', handler.clearCompleted());
    
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
    var filteredList = todoList.getFilteredTodos();
     
    //check to see if toggle-all should be checked based on whether there are any active todos. If there are no active todos, set property to checked.  
    $('#toggle-all').prop('checked', todoList.getActiveTodos().length === 0);
    
    //don't show toggle-all button if theres' no todos
    $('label[for="toggle-all"]').toggle(todoList.todos.length !== 0);
		$('#footer').toggle(todoList.todos.length !== 0);
    
    
    //handlebars templating:
    var htmlList = todoList.htmlTemplate(filteredList);
    $('#todo-list').html(htmlList);
    $('#new-todo').focus();
    util.store("todos", todoList.todos);
		
		//footer outlines
		if (todoList.filter === 'all') {
			$('#all').addClass('outline');
			$('#active').removeClass('outline');
			$('#completed').removeClass('outline');
		} else if (todoList.filter === 'active') {
			$('#all').removeClass('outline');
			$('#active').addClass('outline');
			$('#completed').removeClass('outline');
		} else if (todoList.filter === 'completed') {
			$('#all').removeClass('outline');
			$('#active').removeClass('outline');
			$('#completed').addClass('outline');
		}
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
    store: function(name, data) {
      if(arguments.length > 1) {  
        return localStorage.setItem(name, JSON.stringify(data));
      } else {
        var storedList = localStorage.getItem(name);
				//if first arguement in OR is true, it returns that data, not just the value: true.
        return (storedList && JSON.parse(storedList)) || [];
      }
      
   }
}; //end util object

todoList.init();

