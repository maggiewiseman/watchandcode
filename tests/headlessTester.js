// googletesting.js
casper.test.begin('To Do List Tests', 9, function suite(test) {
  
	
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
				casper.capture('images/threeItemsAdded.png');
			casper.wait(500, function() {
				test.assertEval(function() {
						return __utils__.findAll("li").length === 3;
					}, "list item added");
				 test.assertTextExists('item 1', 'page body contains "item 1"');
				});
			
    });
	
	  //remove a list item
	  //2 tests
		casper.then(function() {
			test.assertExists('.destroy', 'destroy button exists');
			this.click('.destroy', 'removed one item');
			this.capture('images/twoItemsLeft.png');
			test.assertTextDoesntExist('item 1', 'item 1 is gone from page');
			
		});
	
		//cross out a list item
	  //1 test
	  casper.then(function() {
			test.assertExists('.complete-cb', 'complete check box exists');
			this.click('.complete-cb', 'crossed off item 2');
			this.capture('images/crossed1item.png');
		});
	
		//click active and make sure there's only one item left
		//2 tests
		casper.then(function() {
			test.assertExists('#active', 'active button exists');
			this.click('#active', 'showing only active items');
			this.wait(500, function(){
				this.capture('images/activeItem.png');
				test.assertTextDoesntExist('item 2', 'item 2 is gone from page');
			});
			
		});

    casper.run(function() {
        test.done();
    });
});	