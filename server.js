//Modules

var express = require('express');
var bodyParser = require('body-parser');
var cities = require('./js/cities.js');
var genetics = require('./js/genetics.js');
var islands = require('./js/islands.js');

//Server

var app = express();
app.set('port', (process.env.PORT || 5000));
var PORT = app.get('port');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json({limit: "50mb"}));

//Cities

var myCities = cities.myCities;

//Population

var POP_SIZE = 500;
var myPop = genetics.generate(POP_SIZE, myCities);
var myBest = genetics.setBest(myPop);

//Islands

var ISL_SIZE = 5;
var Island = islands.Island;

var myIslands = islands.getIslands(myPop, myBest, POP_SIZE, ISL_SIZE);

var available = [];
available.length = Math.floor(POP_SIZE/ISL_SIZE);
available.fill(0);

function getIndex(myArray) {
	var index = Math.floor(Math.random() * myArray.length);
	if (myArray[index] === 0){
		return index;
	};
	return -1;
};

//Timer

var timer = {};
var TIME = 40000;

//Routes

app.get('/', function(req, res) {
	res.sendFile('./pages/page.html', {root: __dirname});
});

app.get('/random', function(req, res) {
	var index = getIndex(available);
	if (index !== -1) {
		available[index] = 1;
		timer[index] = setTimeout(function() {available[index] = 0}, TIME);
		res.send(myIslands[index]);
	} else {
		res.send('Try again');
	};
});

app.get('/cities', function(req, res) {
	res.send(myCities);
});

app.put('/update', function(req, res) {
	var island = req.body;
	var islBest = island.best;
	var index = island.index;
	
	myIslands[index] = island;
	
	if (islBest.value < myBest.value) {
		myBest = islBest;
	}
	
	clearTimeout(timer[index]);
	available[index] = 0;
	res.end();
});

app.get('/best', function(req, res) {
	res.send(myBest);
});

app.get('/solution', function(req, res){
	res.sendFile('./pages/pageSol.html', {root: __dirname});
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.log('Error: ' + err.message);
	res.end();
});

app.listen(PORT, function() {
	console.log('Run on localhost:5000');
});