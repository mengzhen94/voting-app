'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
		id: String,
		username: String,
		pollIDs: [String]
	
});

module.exports = mongoose.model('User', User);