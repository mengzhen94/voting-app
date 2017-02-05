'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler(){

	this.addPoll = function(req, res){
		var body = req.body;
		console.log("body: ", body);
		console.log("user: ", req.user);

		//Polls.insert();


		res.end(JSON.stringify(body));
	};


}


module.exports = ClickHandler;