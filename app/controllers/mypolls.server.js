'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');
var async = require('async');

function MyPolls(){

	var polls = new Polls();

	this.showPolls = function(req, res){

		console.log("user: ", req.user);

		var pollIds = [];
		var mypolls = [];

		Users
			.findOne({ 'github.id': req.user.github.id })
			.exec(function (err, result) {

				if (err) { throw err; }
				if(result){
					pollIds = result.polls['pollIDs'];

					var pollNum = 0;

					pollIds.forEach(function(pollId) {
    					Polls
							.findOne({ '_id': pollId })
							.exec(function (err, result) {
								if (err) { throw err; }
								if(result){

									mypolls.push(result);

									//wait asynchronous tasks complete
									pollNum++;
									if(pollNum == pollIds.length){
										console.log("mypolls:", mypolls);
										res.send(mypolls);
									}
								}
							});
					});
				}
			});	
	};


}


module.exports = MyPolls;