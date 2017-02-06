'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function EachPoll(){

	var polls = new Polls();

	this.showonePoll = function(req, res){

		console.log("id:", req.params.id);
		res.json(req.params.id);
	};


}


module.exports = EachPoll;