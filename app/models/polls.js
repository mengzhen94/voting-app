'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
		title: String,
		options: [{text: String, votes: Number}]
	
});

module.exports = mongoose.model('Poll', Poll);