

var framesPerSecond = 60;

var canvas;
var canvasContext;

var propertyList = [];
var vehicleList = [];
var peopleList = [];

var ui = new uiClass();
var inGameMenu = null;
var openningStoryScreen = false;

var camPanX = 0;
var camPanY = 0;
var camPanSpeed = 5;

var paused = false;
var gameIsStarted = false;

function changeState(toState){
	if(inGameMenu != null){
		inGameMenu.exit();
	}
	inGameMenu = toState;
	if(inGameMenu != null){
		inGameMenu.init();
	}
}


window.onload = function(){
			
	canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    window.addEventListener("resize", onResize);
    onResize();
		
	initializeAssets();
	loadImages();
	initInput();
	setUpOwners();
	setUpClouds();
		
}

function onResize() {
    // console.log("screen resized");
    // make the canvas full size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // re-center the world
    camPanX = -1 * Math.round(canvas.width/2 - 150);
    camPanY = -1 * Math.round(canvas.height/2 - 300);
}


function imageLoadingDoneSoStartGame(){
	
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
}


function initializeAssets(){
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileTopEdgeY = 0;
	
	for(var eachRow = 0; eachRow < MAP_ROWS; eachRow++){
		tileLeftEdgeX = 0;		

		for(var eachCol = 0; eachCol < MAP_COLS; eachCol++) {
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
				newObject.init(tileIndex);
				newObject.salesPrice = randomIntFromInterval(1000,5000);
				propertyList.push(newObject);
			}
			
		tileTopEdgeY += TILE_H;	
		tileIndex++;
		}
	}
}
		
function moveEverything() {
	if(paused || openningStoryScreen) {
		return;
	}

	for (var i = 0; i < vehicleList.length; i++) {
		vehicleList[i].move();
	}
	for (var i = 0; i < peopleList.length; i++) {
		peopleList[i].move();
	}
	for (var i = 0; i < cloudList.length; i++){
		cloudList[i].move();
	}
	checkForPropertyHovering();
	updateTime(); 
	
	for(var i = 0; i < ownerList.length; i++){
		ownerList[i].checkForPropertiesOwned();
	}
	
			

		
	if(inGameMenu != null){
		inGameMenu.update();
	}
	
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
	colorRect(0,0,canvas.width,canvas.height, '#16171a');
	//if(gameIsStarted === false || paused) {
	   // Menu.draw();} 
	if(openningStoryScreen){ 
		drawOpenningStory();
	} else { //in game
		
		canvasContext.save();
		canvasContext.translate(-camPanX, -camPanY/2);
		drawLandScape();
		
		for (var i = 0; i < vehicleList.length; i++) {
			vehicleList[i].draw();
		}
		for (var i = 0; i < peopleList.length; i++) {
			peopleList[i].draw();
			//console.log(peopleList[0].displayMessageTimer);
		}		
		canvasContext.restore();
		//colorRect(debugBoxX, debugBoxY, 5, 5, "red");
		
		for(i = 0; i < propertyList.length; i++)
		{
			if(propertyList[i].mouseHovering || propertyList[i].mouseSelected)
			{
				gameCoordToIsoCoord(propertyList[i].x, propertyList[i].y);
				colorIsoRect(isoDrawX + (TILE_W/2) - camPanX, isoDrawY - (camPanY/2), TILE_W/2, TILE_H/2, "yellow");
			}
		}

		canvasContext.save();
		canvasContext.translate(-camPanX, -camPanY/2);

		for (var i = 0; i < propertyList.length; i++) {
			propertyList[i].draw();
		}
		
		for (var i = 0; i < cloudList.length; i++){
			cloudList[i].draw();
		}
		
		ui.draw();

		canvasContext.restore();
		
	
		
		if (isHudShown) {
			if(inGameMenu != null){
				canvasContext.globalAlpha = 0.5;
				colorRect(0,0,canvas.width,canvas.height, "black");
				canvasContext.globalAlpha = 1.0;
				inGameMenu.draw();
			}
		
			for(var i = 0; i < ownerList.length; i++){
				ownerList[i].drawStatus();
			}		

			drawOwnedProperties();
			displayGameTime();
		}
	}
}
