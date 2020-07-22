const KEY_W = 87; // MOVE SCREEN UP
const KEY_S = 83; // MOVE SCREEN DOWN
const KEY_A = 65; // MOVE SCREEN LEFT
const KEY_D = 68; // MOVE SCREEN RIGHT
const KEY_P = 80; // PAUSE GAME
const KEY_I = 73; // DISPLAY INFORMATION ABOUT PROPERTIES 
const KEY_L = 76; // TEMPORARY ACCESS TO LAND PURCHASING SCREEN

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mousePosX = 0;
var mousePosY = 0;
var mouseOverIdx = -1;

function initInput(){
	canvas.addEventListener('mousemove', mouseMove);
	canvas.addEventListener('mousedown', handleMouseClick);
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}

function mouseMove(evt) {
    var mousePos = calculateMousePos(evt);
    mousePosX = mousePos.x;
    mousePosY = mousePos.y;
    //mouseOverIdx = getTileIndexAtPixelCoord(mousePosX,mousePosY);
}

function handleMouseClick(evt){
	gesture();
	checkForPropertySelection();
}

function keyPressed(evt) {
	if(inGameMenu != null){
		inGameMenu.handleKey(evt.keyCode);
		return;
	}
	cheats(evt.key);
	switch(evt.keyCode){
		case KEY_W:
		camPanY -= camPanSpeed;
		break;
		case KEY_S:
		camPanY += camPanSpeed;
		break;
		case KEY_A:
		camPanX -= camPanSpeed;
		break;
		case KEY_D:
		camPanX += camPanSpeed;
		break;
		case KEY_P:
			paused = !paused;
		break;
		case KEY_I:
			changeState(menuState_propertyInformation);
		break;
		case KEY_L:
			changeState(menuState_purchasingLand);
		break;
	}
	evt.preventDefault();
}

function keyReleased(evt) {

}


function setKeyHoldState(thisKey, thisSelection, setTo) {
	
}

