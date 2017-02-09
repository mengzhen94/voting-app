'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function AllPoll(){

	this.getAllPolls = function(req, res){

		Polls
			.find()
			.exec(function (err, result) {
				if (err) { throw err; }
				if(result){
					res.json(result);
				}
			});
	};


}


module.exports = AllPoll;


