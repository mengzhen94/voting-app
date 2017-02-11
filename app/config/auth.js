'use strict';

module.exports = {
	'githubAuth':{
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + '/auth/github/callback'
	},

	'facebookAuth': {
        'clientID': process.env.FACE_KEY,
        'clientSecret': process.env.FACE_SECRET,
        'callbackURL': process.env.APP_URL + '/auth/facebook/callback'
    }
};