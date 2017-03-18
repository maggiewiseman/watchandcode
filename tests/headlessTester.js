// googletesting.js
casper.test.begin('To Do List Tests', 4, function suite(test) {
    casper.start('file:///Users/maggie/Dropbox/codingFiles/javascript_practice/watchandcode/index.html', function() {
        test.assertTitle("Maggie's To Do App", "todo app title is the one expected");
        test.assertExists('#new-todo', "input field for new todo found");
        this.fill('#header', {
            newTodo: "casperjs test script"
        }, true);
    });

    casper.then(function() {
			casper.capture('images/login.png');
			test.assertTitle("Maggie's To Do App", "todo app title is the one expected");
			casper.wait(1000, function() {
				test.assertEval(function() {
						return __utils__.findAll("li").length === 	1;
					}, "one list item added");
				});
    });

    casper.run(function() {
        test.done();
    });
});	