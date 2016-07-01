var Island = function(individuals, best, index) {
	this.individuals = individuals;
	this.best = best;
	this.index = index;
};

try {
exports.Island = Island;
} catch(err){};

function getIslands(pop, best, popSize, islSize) {
	var myIslands = [];
	var ind = pop.individuals;
	var numb = popSize/islSize;
	
	for (var i = 0; i < numb; i++) {
		var start = i * islSize;
		var stop = start + islSize;
		var islInd = ind.slice(start, stop);
		var actual = new Island(islInd, best, i);
		myIslands.push(actual);
	};

	return myIslands;
};

try {
exports.getIslands = getIslands;
} catch(err){};