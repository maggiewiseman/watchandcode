var casper = require('casper').create({
//	verbose: true,
//  logLevel: "debug"
});

casper.on('remote.message', function(resource) {
    this.log(resource);
});
//to use expath expressions created in casper for us
var x = require('casper').selectXPath;

//create user agent cuz some browsers give different results/look different
casper.userAgent('Mozilla/4.0 (comptibile; MISE 6.0; Windows NT 5.1)');

//casper.start('https://ec2-54-86-222-53.compute-1.amazonaws.com/');
casper.start('file:///Users/maggie/Dropbox/codingFiles/javascript_practice/watchandcode/index.html', function() {
  	this.echo('hello');

});

casper.then(function() {
  casper.capture('images/login.png');
});



casper.run();

//casper.then(function() {
//  this.sendKeys('#session_access_key', 'AKIAILRLLXJXPQAKJKVQ');
//	this.sendKeys('#session_secret_key', '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');
//	 
//  console.log('entering data');
//  casper.capture('images/login.png');
//});
//
//casper.exists(x('//*[@id="log-in-btn"]'), function(){
//	console.log('login button exists');
//});
//
//casper.thenClick(x('//*[@id="log-in-btn"]'), function() { 
//    console.log('logging in');
//	  casper.capture('images/submit.png');
//   });
//
//
////casper.click(x('//[text() = "AcceptTest”]/following::a*'), function() {
////casper.click('#loggroups > tbody > tr:nth-child(1) > td:nth-child(1) > a', function() {
////		console.log('loading log streams');
////});
//
//casper.wait(2000, function() {
//	casper.thenClick('#loggroups > tbody > tr:nth-child(1) > td:nth-child(1) > a', function() {
//		console.log('loading log streams');
//	});
//
//	
//});
//
//casper.wait(2000, function() {
//	casper.capture('images/logstreamsPage.png');
//	casper.thenClick('#logstreams > tbody > tr:nth-child(1) > td:nth-child(1) > a', function() {			
//		 console.log('clicking into single log stream');
//  });
//
////    casper.click(x('path'));
////    casper.wait(2000, function() {
////        Var theTextIwant = casper.fetchText(x('path'));
////        console.log(theTextIwant);
////    });
//});
//
//casper.wait(5000, function() {
//	casper.capture('images/singleLogsreamPage.png');
//});
//
//
casper.run();
//
//
//
//
//
//
//
//
//
//
//
//
