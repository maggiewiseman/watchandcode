//to-do app testing.js
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
				casper.capture('images/threeItemsAdded.png');
			casper.wait(500, function() {
				test.assertEval(function() {
						return __utils__.findAll("li").length === 3;
					}, "list item added");
				 test.assertTextExists('item 1', 'page body contains "item 1"');
				});
			
    });
	
	  //EDIT TESTING
	  // 1 test
	  casper.then(function() {
			test.assertDoesntExist('.edit', 'element with .edit class exists');
		})
	
	  //remove a list item
	  //2 tests
//		casper.then(function() {
//			test.assertExists('.destroy', 'destroy button exists');
//			this.click('.destroy', 'removed one item');
//			this.capture('images/twoItemsLeft.png');
//			test.assertTextDoesntExist('item 1', 'item 1 is gone from page');
//			
//		});
//	
//		//cross out a list item
//	  //1 test
//	  casper.then(function() {
//			test.assertExists('.complete-cb', 'complete check box exists');
//			this.click('.complete-cb', 'crossed off item 2');
//			this.capture('images/crossed1item.png');
//		});
//	
//		//click active and make sure there's only one item left
//		//4 tests
//		casper.then(function() {
//			test.assertEquals(this.getCurrentUrl(), 'file:///Users/maggie/Dropbox/codingFiles/javascript_practice/watchandcode/index.html#/all', 'url is all');
//			test.assertExists('#active', 'active button exists');
//			this.click('#active', 'showing only active items');
//			this.echo(this.getCurrentUrl());
//			test.assertEquals(this.getCurrentUrl(), 'file:///Users/maggie/Dropbox/codingFiles/javascript_practice/watchandcode/index.html#/active', 'url is active');
//			this.wait(500, function(){	
//				test.assertTextDoesntExist('item 2', 'item 2 is gone from page');
//				this.capture('images/activeItem.png');
//			});
//		});
//    //click complete make sure item 2 appears but item 3 does not		
//	  //4 tests	
//		casper.then(function() {
//			test.assertExists('#completed', 'completed button exists');
//			this.click('#completed', 'showing only completed items');
//			test.assertEquals(this.getCurrentUrl(), 'file:///Users/maggie/Dropbox/codingFiles/javascript_practice/watchandcode/index.html#/completed', 'url is completed');
//			this.wait(500, function() {
//				this.capture('images/completeItems.png');
//				test.assertTextDoesntExist('item 3', 'not showing item 3 ');
//				test.assertTextExists('item 2', 'showing item 2, completedItems buttons works');
//			});
//		});
//
//		//click all button
//		//write toggle all test 
//		//assertExists toggleAll button
//	  //then.click toggleAll button
//	  //then check that url is all
//	  //make sure two items exist
//	  //assertTextExists('item 2', 'item 2 exists');
//	  //assertTextExists('item 3', 'item 3 exists');
//	  //then.click('#active', 'clicked active button');
//	  //assertEval li list has 2 items, copy code from above
//	
//		//clear all items
//		//write a loop or something to destroy last two items os you don't have to clear local storage.
//	 casper.then(function() {
//		 this.click('#all', 'showing only completed items');
//		 test.assertEquals(this.getCurrentUrl(), 'file:///Users/maggie/Dropbox/codingFiles/javascript_practice/watchandcode/index.html#/all', 'url is all');
//		 test.assertExists('label[for="toggle-all"]', 'toggle all button exists');
//		 this.click('label[for="toggle-all"]', 'toggle all clicked');
//		 test.assertExists('#clear-completed', 'clear completed link exists');
//		 this.click('#clear-completed', 'clicked clear-completed');
//		 casper.wait(500, function() {
//				test.assertEval(function() {
//						return __utils__.findAll("li").length === 0;
//					}, "list cleared");
//			  this.capture('images/clearedList.png');
//			});
//		 
////			test.assertExists('.destroy', 'destroy button exists');
////			test.click('.destroy', 'removed one item');
////			this.capture('images/twoItemsLeft.png');
////			test.assertTextDoesntExist('item 1', 'item 1 is gone from page');
//			
//		});
	
	  //edge case tests like really long passages and images.
	
    casper.run(function() {
        test.done();
    });
});	