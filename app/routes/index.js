'use strict';

var path = process.cwd();
var CreatePoll = require(path + '/app/controllers/createPoll.server.js');
//var MyPolls = require(path + '/app/controllers/myPolls.server.js');
var EachPoll =  require(path + '/app/controllers/eachpoll.server.js');
var AllPolls =  require(path + '/app/controllers/allpolls.server.js');

//var bodyParser = require("body-parser");

module.exports = function(app, passport){

	var createPoll = new CreatePoll();
	//var myPolls = new MyPolls();
	var eachPoll = new EachPoll();
	var allPolls = new AllPolls();

	function isLoggedIn(req, res, next){
		//if the user has been verified, then carry on
		if(req.isAuthenticated()){
			return next();
		}else{
			res.redirect('/login');
		}
	}

	

	app.route('/login').get(function(req, res){
		res.sendFile(path + '/public/login.html');
	});

	//load nav bar
	app.route('/nav').get(function(req, res){
		res.sendFile(path + '/public/nav.html');
	});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/auth/facebook')
    .get(passport.authenticate('facebook'));
    
    app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


	app.route('/').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/home.html');
	});

	app.route('/logout').get(function(req, res){
		req.logout();
		res.redirect('/login');
	});

	app.route('/home').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/home.html');
	});

	//show all polls

	app.route('/allpolls').get(function(req, res){
		allPolls.getAllPolls(req, res);
	});

	//create a new poll

	app.route('/newpolls').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/newpolls.html');
	});
	
	app.route('/newpolls').post(isLoggedIn,createPoll.addPoll);


	//show my polls

	app.route('/mypolls').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/mypolls.html');
	});

	app.route('/mypolls/api').get(isLoggedIn, function(req, res){
    	res.json(req.user);
    });

	//app.route('/showmypolls').get(isLoggedIn,myPolls.showPolls);


	//display each poll

	app.route('/polls/:id').get(function(req, res){
		if(req.isAuthenticated()){
			res.sendFile(path + '/public/eachpollLogin.html');
		}else{
			res.sendFile(path + '/public/eachpoll.html');
		}

	});

	app.route('/polls/:id').post(createPoll.updatePoll);



	app.route('/showpolls/:id').get(eachPoll.showonePoll);

	//delete a poll
	app.route('/showpolls/:id/delete').get(isLoggedIn, eachPoll.deletePoll);
    
};


