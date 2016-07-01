fs = require('fs');

function myGetData(myPath) {
	return fs.readFileSync(myPath, 'utf8');
};

function mySplit(myPath) {
	var myData = myGetData(myPath);
	var mySplit = myData.match(/[^\f\r\n\v]+/g); 
	return mySplit;
};

var City = function (name, x, y){
	this.name = name;
	this.x = parseFloat(x);
	this.y = parseFloat(y);
};

function getCities(myPath) {
	var cities = [];
	var myArray = mySplit(myPath);
	var start = myArray.indexOf('NODE_COORD_SECTION');
	var stop = myArray.indexOf('EOF');
	for (var i = start + 1; i < stop; i++) {
		var info = myArray[i];
		var data =  info.match(/\S+/g);
		var name = data[0];
		var x = data[1];
		var y = data[2];
		var city = new City(name, x, y);
		cities.push(city);
	};
	return cities;
};

var PATH = __dirname + '/../tsp_lib';
var FILE = '/a280.tsp';
//var FILE = '/d657.tsp';
//var FILE = '/d1291.tsp';
var myCities = getCities(PATH + FILE);
exports.myCities = myCities;