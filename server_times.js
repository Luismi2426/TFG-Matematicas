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
var TIME = 50000;
var ti = {};
var td = {};

//Routes

app.get('/', function(req, res) {
	
	console.log('Home');
	
	res.sendFile('./pages/page.html', {root: __dirname});
});

app.get('/cities', function(req, res) {
	
	console.log('Cities');
	
	res.send(myCities);
});

app.get('/random', function(req, res) {
	var index = getIndex(available);
	
	console.log('Random: ' + index)
	
	if (index !== -1) {
		
		available[index] = 1;
		ti[index] = Date.now();
		
		timer[index] = setTimeout(function() {available[index] = 0; console.log('Out')}, TIME);
		res.send(myIslands[index]);
	
	} else {
		console.log('RT');
		res.send('Try again');
	};
});

app.put('/update', function(req, res) {
	
	console.log('Update');
	
	var island = req.body;
	var islBest = island.best;
	var index = island.index;
	
	myIslands[index] = island;
	
	if (islBest.value < myBest.value) {
		myBest = islBest;
		
		console.log(myBest.value);
		
	}
	
	clearTimeout(timer[index]);
	
	td[index] = Date.now();
	
	available[index] = 0;

	console.log('Inicial: ' + ti[index]);
	console.log('Final:   ' + td[index]);
	console.log('Time:    ' + (td[index]-ti[index]))
	
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
	res.end('Error');
});

app.listen(PORT, function() {
	console.log('Run on localhost:5000');
});