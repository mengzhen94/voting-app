'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function ClickHandler(){


	this.addPoll = function(req, res){

		var polls = new Polls();

		var body = req.body;
		//console.log("body: ", body);
		//console.log("user: ", req.user);

		polls.title = body.title;
		for(var i = 1 ; i < Object.keys(body).length; i++){
			var x = "option" + i.toString();
			var option = {
				text: body[x],
				votes: 0
			};
			polls.options.push(option);
		}

		//console.log("polls ", polls);

		polls.save(function (err) {
			if (err) {
				throw err;
			}
		});

		Users
			.findOne({ 'github.id': req.user.github.id })
			.exec(function (err, result) {
				if (err) { throw err; }
				if(result){
					result.polls['pollIDs'].push(polls['_id']);
					result.save(function (err) {
						if (err) {
							throw err;
						}
					});
				}
			});

		//res.json(polls);
		res.redirect('/mypolls');
	};

	this.updatePoll = function(req, res){


		var body = req.body;
		console.log("body: ", body);
		console.log("id: ", body.id);
		console.log("vote: ", body.vote);

		Polls.findOneAndUpdate(
			
			{ '_id': body.id, 
            'options.text': body.vote},
			{$inc : {'options.$.votes' : 1}})
			.exec(function(err, result){
				if(err)
					throw err;

				//res.json(result);
			}
		);
		
		res.redirect('/polls/' + body.id.toString());
	};


}


module.exports = ClickHandler;