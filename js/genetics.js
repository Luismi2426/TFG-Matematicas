//Utils

function clone(myArray) {
	var myClone = myArray.slice(0);
	return myClone;
};

function euclidean(x1, x2, y1, y2) {
	var x = x2 - x1;
	var y = y2 - y1;
	var total = Math.sqrt(x * x + y * y);
	return Math.round(total);
};

function distance(origin, destination) {
	var x1 = origin.x;
	var x2 = destination.x;
	var y1 = origin.y;
	var y2 = destination.y;
	return euclidean(x1, x2, y1, y2);
};

function candidates(myLength) {
	var myArray = [];
	for (var i = 0; i < myLength; i++) {
		myArray.push(i);
	};
	return myArray;
};

function myDelete(myArray, myVal) {
	var index = myArray.indexOf(myVal);
	if (index >= 0) {
		myArray.splice(index, 1);
	};
};

function myRandom(max) {
	var random = Math.floor(Math.random()*max);
	return random;
};

function next(myArray, index) {
  if(index === myArray.length - 1) {
    return myArray[0];
  } else {
    return myArray[index+1];
  };
};

function previous(myArray, index) {
  if(index === 0) {
    return myArray[myArray.length - 1];
  } else {
    return myArray[index-1];
  };
};

//Chromosomes

var Chromosome = function(code) {
	this.code = code;
};

function randomChromosome(length) {
	var myCandidates = candidates(length);
	var code = [];
	for (var i = 0; i < length; i++) {
		var random = myRandom(myCandidates.length);
		var city = myCandidates[random];
		myDelete(myCandidates, city);
		code.push(city);
	};
	return new Chromosome(code);
};

function setValue(chromosome, cities) {
	if (!(chromosome.value)) {
		var code = chromosome.code;
		var total = 0;
		var length = code.length;
		
		var originIndex = code[length-1];
		var destinationIndex = code[0];
		var origin = cities[originIndex];
		var destination = cities[destinationIndex];
		total += distance(origin, destination);
		
		for (var i = 0; i < length-1; i++) {
			origin = destination;
			var destinationIndex = code[i+1];
			var destination = cities[destinationIndex];
			total += distance(origin, destination);
		};
		
		chromosome.value = total;
	};
};

function myOrder(a, b) {
	if (a.value < b.value) {
		return -1;
	};
	if (a.value > b.value) {
		return 1;
	};
	return 0;
};

function getChild(fun, par1, par2, cities) {
  var solution = [];
  var p1 = clone(par1.code);
  var p2 = clone(par2.code);
  var city = p1[myRandom(p1.length)];
  solution.push(city);	
	
  while(p1.length > 1) {		
    dest1 = fun(p1, p1.indexOf(city));
    dest2 = fun(p2, p2.indexOf(city));
		var distan1 = distance(cities[city], cities[dest1]);
		var distan2 = distance(cities[city], cities[dest2]);
		myDelete(p1, city);
    myDelete(p2, city);	
		
		if (distan1 < distan2) {
			city = dest1;
		} else {
			city = dest2;
		};
    solution.push(city);
  };
	
  return new Chromosome(solution);
};

function crossover(x, y, problem) {
  var child1 = getChild(next, x, y, problem);
	var child2 = getChild(previous, y, x, problem);
  return [child1, child2];
};

function disMutation(chromosome) {
	var code = clone(chromosome.code);
	var len = code.length;
	var index1 = myRandom(len);
	var index2 = myRandom(len);
	
	var min = Math.min(index1, index2);
	var max = Math.max(index1, index2);
	var aux = max - min + 1;
	
	var subtour = code.splice(min, aux);
	var randPos = myRandom(code.length);
	var tour1 = code.splice(0, randPos);
	var myCode = tour1.concat(subtour, code);
	
	return new Chromosome(myCode);
};

//Population

var Population = function(individuals, size, cities) {
	this.individuals = individuals;
	this.size = size;
	this.cities = cities;
};

function popFill(population) {
	var myLength = population.cities.length;
	var mySize = population.size;
	var myActualSize = population.individuals.length;
	var aux = mySize - myActualSize;
	if (aux > 0) {
		for (var i = 0; i < aux; i++) {
			var random = randomChromosome(myLength);
			population.individuals.push(random);
		};
	};
};

function evaluate(population) {
	var individuals = population.individuals;
	var actualSize = population.individuals.length;
	var cities = population.cities;
	for (var i = 0; i < actualSize; i++) {
		setValue(individuals[i], cities);
	};
};

function generate(size, cities) {
	var myPopulation = new Population([], size, cities);
	popFill(myPopulation);
	return myPopulation;
};

try {
exports.generate = generate;
} catch(err){};

function popSort(population) {
	evaluate(population);
	population.individuals.sort(myOrder);
};

function setBest(population) {
	popSort(population);
	var individuals = population.individuals;
	var best = individuals[0];
	return best;
};

try {
exports.setBest = setBest;
} catch(err){};

function setFitness(population) {
	var myInd = population.individuals;
	var fitnessValues = [];
	
	for (var i = 0; i < myInd.length; i++) {
		var value = 1.0/myInd[i].value;
		fitnessValues.push(value);
	};
	
	return fitnessValues;
};

function reducePop(population) {
	var size = population.size;
	population.individuals.length = size;
};

//Algoritmos

function tournament(population, fitness, tourSize) {
	var myInd = population.individuals;
	var index = candidates(population.size);
	var tourIndex = [];
	
	for (var i = 0; i < tourSize; i++) {
		var random = myRandom(index.length);
		var aux = index[random];
		tourIndex.push(aux);
		myDelete(index, aux);
	};

	var champion = myInd[tourIndex[0]];

	for (var i = 1; i < tourSize; i++) {
		var anterior = fitness[tourIndex[i-1]];
		var actual = fitness[tourIndex[i]];
		if (anterior < actual) {
			champion = myInd[tourIndex[i]];
		};
	};
	
	return champion;
};

function tourSelection(population, best, tourSize) {
	var parents = [];
  parents.push(best);
	var fitness = setFitness(population);
	
	for (var i = 1; i < population.size; i++) {
		var one = tournament(population, fitness, tourSize);
		parents.push(one);
	};
	
	return parents;
};

function doCrossover(parents, prob1, prob2, cities) {
	var childs = [];
	for (var i = 0; i < parents.length - 1; i++) {
		var random = Math.random();
		
		if(random < prob1) {
			var p1 = parents[i];
			var p2 = parents[i + 1];
			var aux = crossover(p1, p2, cities);
			childs = childs.concat(aux);
			
			if (random < prob2) {
				var mutant1 = disMutation(aux[0]);
				var mutant2 = disMutation(aux[1]);
				childs.push(mutant1, mutant2);
			};
		};
	};
	
	return childs;
};

function nextGen(population, best) {
	var cities = population.cities;
	var parents = tourSelection(population, best, 2);
	var childs = doCrossover(parents, 0.9, 0.05, cities);
	var ind = clone(population.individuals);
	var newInd = ind.concat(childs);
	var newPop = new Population(newInd, population.size, cities);
	return newPop;
};

function mainGen(pop, best, gens) {
	for (var i = 0; i < gens; i++) {
		var newPop = nextGen(pop, best);
		var actualBest = setBest(newPop);
		reducePop(newPop);
		pop = newPop;
		
		if (actualBest.value < best.value) {
			best = actualBest;
		};
	};
	return [pop, best];
};