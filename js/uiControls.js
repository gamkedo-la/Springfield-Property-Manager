const KEY_W = 87; // MOVE SCREEN UP
const KEY_S = 83; // MOVE SCREEN DOWN
const KEY_A = 65; // MOVE SCREEN LEFT
const KEY_D = 68; // MOVE SCREEN RIGHT
const KEY_P = 80; // PAUSE GAME
const KEY_I = 73; // DISPLAY INFORMATION ABOUT PROPERTIES 
const KEY_L = 76; // TEMPORARY ACCESS TO LAND PURCHASING SCREEN
const KEY_SPACEBAR = 32; // PURCHASE - TEMPORARY
const KEY_TAB = 9; // TOGGLE HUD
const KEY_BACKSPACE = 8;
const KEY_ENTER = 13; 
const KEY_SHIFT = 16;
const KEY_V = 86; // PURCHASE CPU 1 - TEMPORARY
const KEY_B = 66; // PURCHASE CPU 2 - TEMPORARY
const KEY_N = 78; // PURCHASE CPU 3 - TEMPORARY
const KEY_M = 77; // PURCHASE CPU 4 - TEMPORARY
const KEY_Q = 81; // Decide to purchase a property

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mousePosX = 0;
var mousePosY = 0;
var mouseOverIdx = -1;
var gesture = false;
var isHudShown = true;

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
	//gesture();   //current bug, crashes when mouse clicks
    if (USE_STATSGRAPH) statsCountClick();
    checkForPropertySelection();
}

function keyPressed(evt) {
	if(typeof inGameMenu !== "undefined" && inGameMenu != inGameMenu){
		if(typeof evt.keyCode != null) {
			inGameMenu.handleKey(evt.keyCode);
		}
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
		case KEY_SPACEBAR:
		if(ownerList[OWNER_HUMAN].atProperty != null){
			ownerList[OWNER_HUMAN].buyProperty(ownerList[OWNER_HUMAN].atProperty);
		}
		break;
		case KEY_TAB:
		isHudShown = !isHudShown;
		document.getElementsByClassName('uiContainerMain')[0].style.display = isHudShown ? 'flex' : 'none';
		break;
		///// V, B, N, and M are just for testing CPU's buying ability
		case KEY_V:
		if(ownerList[OWNER_HUMAN].atProperty != null){
			ownerList[OWNER_CPU_1].buyProperty(ownerList[OWNER_HUMAN].atProperty);
		}
		break;	
		case KEY_B:
		if(ownerList[OWNER_HUMAN].atProperty != null){
			ownerList[OWNER_CPU_2].buyProperty(ownerList[OWNER_HUMAN].atProperty);
		}
		break;	
		case KEY_N:
		if(ownerList[OWNER_HUMAN].atProperty != null){
			ownerList[OWNER_CPU_3].buyProperty(ownerList[OWNER_HUMAN].atProperty);
		}
		break;	
		case KEY_M:
		if(ownerList[OWNER_HUMAN].atProperty != null){
			ownerList[OWNER_CPU_4].buyProperty(ownerList[OWNER_HUMAN].atProperty);
		}
		break;	
		case KEY_Q:
			callPurchaseProperty(); //this will change to a function to randomize.  Keeping for now for trouble-shooting
		break;
	}
	if(typeof evt.preventDefault !== "undefined"){
		evt.preventDefault();
	}
}

function keyReleased(evt) {

}


function setKeyHoldState(thisKey, thisSelection, setTo) {
	
}

