var canvas;
var canvasContext;

var propertyList = [];
var vehicleList = [];
var peopleList = [];

var camPanX = 0;
var camPanY = 0;
var camPanSpeed = 5;


window.onload = function(){
			
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
		
	initializeAssets();
	loadImages();
	initInput();
		
	canvas.addEventListener('mousemove', function(evt) {
	
		var mousePos = calculateMousePos(evt);
		
		MousePosX = mousePos.x;
		MousePosY = mousePos.y;
	});
	
	canvas.addEventListener('mousedown', handleMouseClick);
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
				newObject.init("1");
				peopleList.push(newObject);
			} else if (roomGrid[ tileIndex ] == TILE_VEHICLE) {
				newObject = new vehicleClass();
				newObject.init("1");
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
	checkForPropertyHovering();
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
	canvasContext.save();
	canvasContext.translate(-camPanX, -camPanY/2);
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
	canvasContext.restore();
	//colorRect(debugBoxX, debugBoxY, 5, 5, "red");
	displayGameTime();
}
