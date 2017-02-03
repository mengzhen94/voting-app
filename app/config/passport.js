/*
The GitHub API :

id: The numeric ID associated with the GitHub account.
displayName: The full name (i.e. first and last) for the GitHub account.
username: The GitHub username for the account
public_repos: The number of public repositories associated with the GitHub account

*/

'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function(passport){
	/*
	In serializeUser, we're passing in a callback function with the user 
	object and done as arguments. done is a function native to Passport, 
	which tells Passport to proceed in the authentication process.
	 When done(null, user.id) is called, Passport takes this information 
	 and passes it to the authenticate function. 
	 The information is stored in the req.session.passport.user user object.
	*/
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	 },
	function(Token, refreshToken, profile, done) {
		process.nextTick(function(){
			User.findOne({'github.id':profile.id}, function(err,user){
				if(err)
					return done(err);
				if(user){
					return done(null, user);
				}else{
					var newUser = new User();

					newUser.github.id = profile.id;
					newUser.github.username = profile.username;
					newUser.github.displayName = profile.displayName;
					newUser.github.publicRepos = profile._json.public_repos;

					newUser.nbrClicks.clicks = 0;
					// insert this information into the database
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					});
				}
			});		
		});
  	  }
	));
};