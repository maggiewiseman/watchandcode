// googletesting.js
casper.test.begin('To Do List Tests', 5, function suite(test) {
  
	
  //2 test items
	casper.start('file:///Users/maggie/Dropbox/codingFiles/javascript_practice/watchandcode/index.html', function() {
        test.assertTitle("Maggie's To Do App", "todo app title is the one expected");
        test.assertExists('#new-todo', "input field for new todo found");
			
    });

		//add three list items
    casper.then(function() {
			for(var i = 1; i < 4; i++) {
				var listItem = "item " + i;
				this.fill('#header', {
            newTodo: listItem
        }, true);
				this.sendKeys('#new-todo', casper.page.event.key.Enter);	
			}
			
			//take a picture of three items
			//2 tests
			console.log('take a pic, should be three items');
				casper.capture('images/login.png');
			casper.wait(500, function() {
				test.assertEval(function() {
						return __utils__.findAll("li").length === 3;
					}, "list item added");
				 test.assertTextExists('item 1', 'page body contains "item 1"');
				});
			
    });
	
	  //remove a list item
	  //1 test
		casper.then(function() {
			test.assertExists('.destroy', 'destroy button exists');
			
		});

    casper.run(function() {
        test.done();
    });
});	