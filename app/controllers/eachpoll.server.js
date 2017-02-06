'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function EachPoll(){

	var polls = new Polls();

	this.showonePoll = function(req, res){
		Polls
			.findOne({ '_id': req.params.id })
			.exec(function (err, result) {
				if (err) { throw err; }
				if(result){
					res.json(result);
				}
			});
	};


}


module.exports = EachPoll;