const express = require('express');
const path = require('path');

//connecting to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Connecting to Database
db.once('open', function() {
	console.log('connected to mongoDb');
});

//Checking db errors
db.on('error', function(err) {
	console.log(err);
});

//initialize app
const app = express();

//Bringing in models
let Article = require('./models/article');

//loading view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//setting home route
app.get('/', function(req, res) {
	//get all articles
	Article.find({}, function(err, articles) {
		if (err) {
			console.log(err);
			return;
		}
		res.render('index', {
			title:'Articles',
			articles: articles
		});
	});
});

//adding "add articles" route
app.get('/articles/add', function(req, res) {
	res.render('add_articles', {
		title:'Add Articles'
	});
});


//creating server
app.listen(3000, function() {
	console.log("Server running on port 3000...");
});