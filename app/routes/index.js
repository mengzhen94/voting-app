'use strict';

var path = process.cwd();
//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function(app, passport){

	function isLoggedIn(req, res, next){
		//if the user has been verified, then carry on
		if(req.isAuthenticated()){
			return next();
		}else{
			res.redirect('/login');
		}
	}

	//var clickHandler = new ClickHandler();

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


	app.route('/').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/home.html');
	});

	app.route('/logout').get(function(req, res){
		req.logout();
		res.redirect('/login');
	});

	app.route('/mypolls').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/mypolls.html');
	});

	app.route('/newpolls').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/newpolls.html');
	});

	app.route('/home').get(isLoggedIn, function(req, res){
		res.sendFile(path + '/public/home.html');
	});

	//each poll
	app.route('/polls/:id').get(function(req, res){
		res.sendFile(path + '/public/eachpoll.html');
	});







	/*

	app.route('/api/:id')
	.get(isLoggedIn, function(req, res){
		res.json(req.user.github);
	});

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);

	*/
};


