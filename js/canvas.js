var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var RATIO = 16/9;

function myMin(a, b) {
	if (a < b) {
		return a;
	};
	return b;
};

function myMax(a, b) {
	if (a < b) {
		return b;
	};
	return a;
};

function rescale(ratio) {
	var myWidth = window.innerWidth * 0.75;
	var myHeight = window.innerHeight * 0.75;
	if (myHeight < myWidth) {
		canvas.width = myHeight * RATIO;
		canvas.height = myHeight;
	} else {
		canvas.width = myWidth;
		canvas.height = myWidth / RATIO;
	};
};

function translation(min) {
	var trans = 0;
	if (min < 0) {
		trans = min;
	} else {
		trans = - min;
	};
	return trans + 10;
};

function getCoef(max, trans, limit) {
	var myMax = max + trans;
	var unfitted = true;
	var i = 1;
	var j = 1;
	if (myMax < limit) {
		while (unfitted) {
			i = j;
			j = j * 0.90;
			if (limit - 20 < myMax / j ) {
				unfitted = false;
			};
		};
	} else {
		while (unfitted) {
			i = j;
			j += 0.10;
			if (myMax / j < limit - 20) {
				unfitted = false;
			};
		};
	};
	return i;
};

function fitPoint(p, tx, ty, coef) {
	var x = (p.x + tx)/coef;
	var y = (p.y + ty)/coef;
	return {x: x, y: y};
};

function drawCircle(point) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 3, 0, Math.PI*2, true);
  ctx.closePath();
	ctx.fillStyle="#FF0000";
  ctx.fill();
};

function drawLine(p1, p2) {
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.stroke();
};

// Main

var myCitiesCanvas;
$.ajaxSetup({ cache: false });

function mainDraw(cities, tx, ty, coef) {
	
	$.get('/best', function(info) {
		
		var myBest = info;
		var myCode = myBest.code;
		
		document.getElementById('value').textContent = info.value;
		document.getElementById('tour').textContent = myCode;
		
		var i1 = myCode[0];
		var a = fitPoint(cities[i1], tx, ty, coef);
		drawCircle(a);
		
		for (var i = 1; i < myCode.length ; i++) {
			var i2 = myCode[i];
			var b = fitPoint(cities[i2], tx, ty, coef);
			drawLine(a, b);
			drawCircle(b);
			a = b;
		};
		
	})
};

function mainCanvasAux(cities) {
	
	rescale(RATIO);
	var myWidth = canvas.width;
	var myHeight = canvas.height;
	
	var minX = cities[0].x;
	var maxX = cities[0].x;
	var minY = cities[0].y;
	var maxY = cities[0].y;
	
	for (var i = 1; i < cities.length; i++) {
		var actual = cities[i];
		minX = myMin(minX, actual.x);
		maxX = myMax(maxX, actual.x);
		minY = myMin(minY, actual.y);
		maxY = myMax(maxY, actual.y);
	};
	
	var tx = translation(minX);
	var ty = translation(minY);
	var coef = getCoef(maxX, tx, myWidth);
	var aux = getCoef(maxY, ty, myHeight);
	if (coef < aux) {
		coef = aux;
	};
		
	mainDraw(cities, tx, ty, coef);
	
};

function mainCanvas() {
	$.get('/cities', function(info) {
		myCitiesCanvas = info;
		mainCanvasAux(myCitiesCanvas);
		setInterval(function(){mainCanvasAux(myCitiesCanvas);}, 30000);
		window.addEventListener('resize', function(){mainCanvasAux(myCitiesCanvas);}, false);
	});
};

mainCanvas();
