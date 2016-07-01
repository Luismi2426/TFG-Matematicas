//Configuration

var POP_SIZE = 50;
var GENS = 20;

//Main

var myCities;
$.ajaxSetup({ cache: false });

function mainAux(cities) {

	$.get('/random', function(info) {

		if (info === 'Try again') {
			return setTimeout(mainAux(cities), 5);
		} else {

			var myInd = info.individuals;
			var myBest = info.best;
			var myIndex = info.index;
			var islSize = myInd.length;

			var myPop = new Population(myInd, POP_SIZE, myCities);
			popFill(myPop);

			var result = mainGen(myPop, myBest, GENS);
			var newPop = result[0];
			var actualBest = result[1];

			if (actualBest.value < myBest.value) {
				myBest = actualBest;
			};

			var islInd = newPop.individuals;
			islInd.length = islSize;
			var myIsland = new Island(islInd, myBest, myIndex);

			$.ajax({type: 'put',
							url: "/update",
							data: JSON.stringify(myIsland),
							contentType: "application/json; charset=utf-8"});
		};

		return setTimeout(function(){mainAux(cities);}, 5);
	});
};

function main() {
	$.get('/cities', function(info) {
		myCities = info;
		mainAux(myCities);
	});
};

main();