'use strict';

var Users = require('../models/users.js');

function ClickHandler(){

	this.addPoll = function(req, res){
		var body = req.body;
		console.log("server-request: ", body);
		console.log(Object.keys(body));
		res.end(JSON.stringify(body));
	};


}


module.exports = ClickHandler;