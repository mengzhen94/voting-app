'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function(app, passport){

	function isLoggedIn(req, res, next){
		//if the user has been verified, then carry on
		if(req.isAuthenticated()){
			return next();
		}else{
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	/*
	if the user is authenticated, then Express passes control 
	back to the app.route middleware and proceeds processing the route.
	*/
	app.route('/').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/index.html');
	});

	app.route('/login').get(function(req, res){
		res.sendFile(path + '/public/login.html');
	});

	//load nav bar
	app.route('/nav').get(function(req, res){
		res.sendFile(path + '/public/nav.html');
	});


	/*
	Passport exposes a logout() function on req (also aliased as logOut()) 
	that can be called from any route handler which needs to terminate a 
	login session. 
	*/
	app.route('/logout').get(function(req, res){
		req.logout();
		res.redirect('/login');
	});

	app.route('/profile').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/profile.html');
	});

	// This is the object which contains all the relevant user information, 
	//and we will query this from the front end later for the profile page.
	app.route('/api/:id')
	.get(isLoggedIn, function(req, res){
		res.json(req.user.github);
	});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	/*
	We're defining a new route here for our API
	The getClicks function will be executed anytime 
	there is an HTTP GET request on the /api/clicks URL. 
	This will tell the Node to execute the controller function 
	we defined previously and get the results from the database.
	*/
	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};


