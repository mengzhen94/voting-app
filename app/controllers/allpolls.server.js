'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function AllPoll(){

	//var polls = new Polls();

	this.getAllPolls = function(req, res){
		//console.log("req: ",req);
		/*Polls
			.findOne({ '_id': req.params.id })
			.exec(function (err, result) {
				if (err) { throw err; }
				if(result){
					res.json(result);
				}
			});
		*/
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


