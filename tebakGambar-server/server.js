// setup
var express 	= require('express');
var app			= express();
var mongoose 	= require('mongoose');
var logger		= require('morgan');
var bodyParser	= require('body-parser');
var cors		= require('cors');

// configuration
mongoose.connect('mongodb://localhost/tebakgambar');

app.use(bodyParser.urlencoded({extended:false})) // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

// Models
// lets create The Model first
var User = mongoose.model('User', {
				username: String,
				score: Number
			});

var Puzzle = mongoose.model('Puzzle', {
				question: Number,
				answer: String
			});

// this is for leading zero
/*function pad (str, max) {
  return str.length < max ? pad("0" + str, max) : str;
}*/

/*User.remove({}, function(res){
    console.log("removed records");
});

Puzzle.remove({}, function(rest) {
	console.log("removed records");
});*/

// This is for checking puzzle count
Puzzle.count({}, function(err, count) {
	console.log("Puzzle: "+ count);
	// if puzzle count is 0 then auto generate puzzle from 0-9
	if(count === 0) {
		var recordsToGenerate = 10;

		var arr =  ["Pikir Pendek", "Adu Domba", "Adu Mulut", "Adu Nasib", "Air Mata Buaya", "Air Putih", "Akal Bulus", "Anak Angkat", "Anak Bawang", "Anak Buah"];

		for(var i=0; i < recordsToGenerate; i++) {
			var newPuzzle = new Puzzle({
				question: i,
				answer: arr[i]
			});

			newPuzzle.save(function(err, doc) {
				console.log("Created test document: " + doc._id);
			});
		}
	}
});

// Create API Routes

/**
* Puzzles
*
**/
app.post('/api/puzzles', function(req,res) {

	let options = {};

	console.log(req.body.question);
	if(req.body.question) {
		options = {
			question: req.body.question
		}
	}

	Puzzle.find(options, function(err, puzzles) {
		if(err) {
			res.send(err);
		} else {
			res.send(puzzles);
		}
	}).sort({_id: 1});
});

/**
* Puzzles Detail
* For getting detail information of puzzle
* @param req.body._id string
*
**/

app.post('/api/puzzles/detail', function(req, res) {
	console.log(req.body._id);

	// find puzzle model by id
	Puzzle.findById(req.body._id, function(err, puzzle) {
		if(err) {
			res.send(err);
		} else {
			res.send(puzzle);
		}
	});
});

/**
* Users
* For getting all information of users
* @param req.body.username string
*
**/

app.post('/api/users', function(req,res) {
	// find user model by username
	User.find({username: req.body.username}, function(err,users) {
		if(err) {
			res.send(err);
		} else {
			res.send(users);
		}
	});
});

/**
* Users Add
* For adding a user information
* @param req.body.username string
*
**/

app.post('/api/users/add', function(req, res) {
	
	console.log('create user');

	// create a user
	User.create({
		username: req.body.username,
		score: 0
	}, function(err, user) {
		// let's output the error
		if(err)
			res.send(err);

		// if not error
		res.send(user);
	});
});

/**
* Users Detail
* For seeing detail information of user
* @param req.body.id string
*
**/

app.post('/api/users/detail', function(req,res) {

	// find user model by id
	User.findById(req.body.id, function(err, user) {
		if(err) {
			res.send(err);
		} else {
			res.send(user);
		}
	});
});

/**
* Users Update
* For updating detail information of user
* @param req.body.id string
* @param req.body.score number
*
**/

app.post('/api/users/update', function(req, res) {
	console.log(req.body._id);
	// lets create newscore
	let newscore = req.body.score+10;
	console.log(newscore);

	// find user model by id and then update it
	User.findByIdAndUpdate(req.body._id, {
        score: newscore
    }, {
        safe: true, 
        new: true // to return the modified document rather than the original
    }, function(err, user){
        if(err){
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

// listen
app.listen(8080); // to run nodejs as a server on port 8080. ex: http://localhost:8080
console.log("App listening on port 8080");