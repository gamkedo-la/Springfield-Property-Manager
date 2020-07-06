const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mousePosX = 0;
var mousePosY = 0;
var mouseOverIdx = -1;

function initInput(){
	
	canvas.addEventListener('mousemove', function(evt) {
	
		var mousePos = calculateMousePos(evt);
	
		mousePosX = mousePos.x;
		mousePosY = mousePos.y;
		//mouseOverIdx = getTileIndexAtPixelCoord(mousePosX,mousePosY);
		
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}

function handleMouseClick(evt){
	checkForPropertySelection();
}

function keyPressed(evt) {
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
	}
	evt.preventDefault();
}

function keyReleased(evt) {

}


function setKeyHoldState(thisKey, thisSelection, setTo) {
	
}

