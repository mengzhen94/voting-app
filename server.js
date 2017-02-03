'use strict';
var express = require("express"),
	routes = require("./app/routes/index.js"),
	mongoose = require("mongoose"),
	passport = require('passport'),
	session = require('express-session');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

//mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

app.use(session({
	secret:'secretClementine',
	resave:false,
	saveUnintialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(8080, function(){
	console.log("Listening on port" + port + '...');
});