'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function EachPoll(){

	//var polls = new Polls();

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

	this.deletePoll = function(req, res){

		//console.log("req.user: ", req.user);
		
		Polls
			.findOne({ '_id': req.params.id }).remove()
			.exec(function (err, result) {
				if (err) { throw err; }
				//if(result){
					//console.log("result: ", result);
					//res.json(result);
				//}
			});

		Users
			.findOne({ 'github.id': req.user.github.id })
			.exec(function (err, result) {
				if (err) { throw err; }
				if(result){

					for(var i = result.polls['pollIDs'].length - 1; i >= 0; i--) {
    					if(result.polls['pollIDs'][i] == req.params.id) {
       						result.polls['pollIDs'].splice(i, 1);
    					}
					}

					//console.log("result.pollIds: ",result.polls['pollIDs']);

					result.save(function (err) {
						if (err) {
							throw err;
						}
					});
				}
			});
		res.redirect('/mypolls');
	};


}


module.exports = EachPoll;