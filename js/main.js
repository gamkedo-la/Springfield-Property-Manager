var canvas;
var canvasContext;

var propertyList = [];
var vehicleList = [];
var peopleList = [];

window.onload = function(){
			
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
		
	initializeAssets();
	loadImages();
		
	canvas.addEventListener('mousemove', function(evt) {
	
		var mousePos = calculateMousePos(evt);
		
		MousePosX = mousePos.x;
		MousePosY = mousePos.y;
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}




function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 60;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
}


function initializeAssets(){
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileTopEdgeY = 0;
	
	for(var eachRow = 0; eachRow<MAP_ROWS; eachRow++){
		tileLeftEdgeX = 0;		
		for(var eachCol=0; eachCol<MAP_COLS; eachCol++) {
			if (roomGrid[ tileIndex ] == TILE_PERSON) {
				newObject = new peopleClass();
				newObject.init("blue", "1");
				peopleList.push(newObject);
			} else if (roomGrid[ tileIndex ] == TILE_VEHICLE) {
				newObject = new vehicleClass();
				newObject.init("orange","1");
				vehicleList.push(newObject);
			} else if (roomGrid[ tileIndex ] == TILE_PROPERTY) {
				newObject = new propertyClass();
				var propertyNumber = tileIndex;
				newObject.init(propertyNumber);
				propertyList.push(newObject);
			}
		tileTopEdgeY += TILE_H;	
		tileIndex++;
		}
	}
}
		
function moveEverything() {
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].move();
	}
	for (var i = 0; i < peopleList.length; i++) {
		peopleList[i].move();
	}
	updateTime(); 
}
			
function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX, 
		y: mouseY
	};
}
						
function drawEverything() {		
	colorRect(0,0,canvas.width,canvas.height, 'black');		
	drawLandScape();
	for (var i = 0; i < propertyList.length; i++) {
		propertyList[i].draw();
	}
	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].draw();
	}
	for (var i = 0; i < peopleList.length; i++) {
		peopleList[i].draw();
	}
	displayGameTime();
}
