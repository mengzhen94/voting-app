'use strict';

var Users = require('../models/users.js');

function ClickHandler(){

	this.getClicks = function(req, res){

		//we don't want the 'id' field to show up in our results 
		//equals to {'_id' : 0}

		Users
		.findOne({'github.id':req.user.github.id}, {'_id' : false})
		.exec(function(err, result){
			if(err)
				throw err;

			res.json(result.nbrClicks);
		});
	};

	this.addClick = function(req, res){
		Users.findOneAndUpdate(
			////user will be assigned to req.user.
			{'github.id':req.user.github.id},
			// Mongo $inc method
			{$inc : {'nbrClicks.clicks' : 1}})
			.exec(function(err, result){
				if(err)
					throw err;

				res.json(result.nbrClicks);
			}
		);
	};

	this.resetClicks = function(req, res){
		Users.findOneAndUpdate(
			{'github.id':req.user.github.id},
			{'nbrClicks.clicks' : 0})
			.exec(function(err, result){
				if(err) throw err;

				res.json(result.nbrClicks);
			}
		);
	};
}


module.exports = ClickHandler;