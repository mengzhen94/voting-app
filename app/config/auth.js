'use strict';
var port = process.env.PORT || 8080;
var ip = process.env.IP || process.env.localIP;

module.exports = {
	'githubAuth':{
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': ip + ':' + port + '/auth/github/callback'
	},

	'facebookAuth': {
        'clientID': process.env.FACE_KEY,
        'clientSecret': process.env.FACE_SECRET,
        'callbackURL': ip + ':' + port + '/auth/facebook/callback'
    }
};