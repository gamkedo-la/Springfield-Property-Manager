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
const KEY_1 = 49; // Turn music on
const KEY_Y = 89; //storming
const KEY_Z = 90; // reset zoom
const KEY_3 = 51; // jump month
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;
const KEY_7 = 55;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mousePosX = 0;
var mousePosY = 0;
var mouseMovementX = 0;
var mouseMovementY = 0;
var rightClicked = false;
var mouseOverIdx = -1;
var gesture = false;
var isHudShown = true;

function initInput() {
  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("mousedown", handleMouseClick);
  window.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
}

function mouseMove(evt) {
  var mousePos = calculateMousePos(evt);
  mousePosX = mousePos.x;
  mousePosY = mousePos.y;
  mouseMovementX = evt.movementX;
  mouseMovementY = evt.movementY;

  //mouseOverIdx = getTileIndexAtPixelCoord(mousePosX,mousePosY);
}

function handleMouseClick(evt) {
  if (!siteActivatedWithClick) {
    siteActivatedWithClick = true;
  }

  rightClicked = evt.button == 2;

  if(announcementIsPosted()){
	eraseAnnouncements();
	return;
  }

  if (gameIsStarted === false) {
    Menu.menuMouse();
    return;
  }
  if(openningStoryScreen) {
    advanceStory();
    return;
  }

  //gesture();   //current bug, crashes when mouse clicks
  if (USE_STATSGRAPH) {
    statsCountClick();
  }
  if (audioButton.hovered) {
    audioButton.toggle();
  }
  if (helpButton.hoverCheck()) {
    helpButton.setShow();
  }
  checkForPropertySelection();
}

function handleMouseUp(evt) {
  rightClicked = false;
  mouseMovementX = 0;
  mouseMovementY = 0;
}

var camPanXV = 0;
var camPanYV = 0;

function keyPressed(evt) {
  if (typeof inGameMenu !== "undefined" && inGameMenu != inGameMenu) {
    if (typeof evt.keyCode != null) {
      inGameMenu.handleKey(evt.keyCode);
    }
    return;
  }

  if (gameIsStarted == false) {
    switch (evt.keyCode) {
      case KEY_ENTER:
      case KEY_SPACEBAR:
        Menu.setCursorAndCurrentPage(); // FIXME this function uses mouse coordinates
        break;
      case KEY_UP_ARROW:
      case KEY_W:

        Menu.cursor--;
        navigationSFX.play();
        break;
      case KEY_DOWN_ARROW:
      case KEY_S:
        Menu.cursor++;
        navigationSFX.play();
        break;
    }
  } else {
    cheats(evt.key);
    switch (evt.keyCode) {
      case KEY_W:
        camPanYV = -camPanSpeed;
        break;
      case KEY_S:
        camPanYV = camPanSpeed;
        break;
      case KEY_A:
        camPanXV = -camPanSpeed;
        break;
      case KEY_D:
        camPanXV = camPanSpeed;
        break;
      case KEY_P:
        if (!drawPlayerDesignsOnly) {
          playerPaused = !playerPaused;
        }
        break;
      case KEY_I:
        //changeState(menuState_propertyInformation);
        break;
      case KEY_L:
        //changeState(menuState_purchasingLand);
        break;
      case KEY_SPACEBAR:
        if (ownerList[OWNER_HUMAN].atProperty != null) {
          ownerList[OWNER_HUMAN].buyProperty(ownerList[OWNER_HUMAN].atProperty);
        }
        break;
      case KEY_TAB:
        isHudShown = !isHudShown;
        document.getElementsByClassName(
          "uiContainerMain"
        )[0].style.display = isHudShown ? "flex" : "none";
        document.getElementsByClassName(
          "citySignContainer"
        )[0].style.display = isHudShown ? "flex" : "none";
        document.getElementsByClassName(
          "statsContainerMain"
        )[0].style.display = isHudShown ? "flex" : "none";
        break;
      ///// V, B, N, and M are just for testing CPU's buying ability
      case KEY_V:
        if (ownerList[OWNER_HUMAN].atProperty != null) {
          ownerList[OWNER_CPU_1].buyProperty(ownerList[OWNER_HUMAN].atProperty);
        }
        break;
      case KEY_B:
        if (ownerList[OWNER_HUMAN].atProperty != null) {
          ownerList[OWNER_CPU_2].buyProperty(ownerList[OWNER_HUMAN].atProperty);
        }
        break;
      case KEY_N:
        if (ownerList[OWNER_HUMAN].atProperty != null) {
          ownerList[OWNER_CPU_3].buyProperty(ownerList[OWNER_HUMAN].atProperty);
        }
        break;
      case KEY_M:
        if (ownerList[OWNER_HUMAN].atProperty != null) {
          ownerList[OWNER_CPU_4].buyProperty(ownerList[OWNER_HUMAN].atProperty);
        }
        break;
      case KEY_Q:
        callPurchaseProperty(); //this will change to a function to randomize.  Keeping for now for trouble-shooting
        break;
      case KEY_1:
        backgroundSong.play();
        cityambience.play();
        //this will change to a function to randomize.  Keeping for now for trouble-shooting
        break;
      case KEY_Y:
        isStorming = !isStorming;
        break;
      case KEY_Z:
        zoom = 0;
        break;
      case KEY_4:
        drawPlayerDesignsOnly = !drawPlayerDesignsOnly;
        paused = drawPlayerDesignsOnly;
        whichPlayerDesignsToShow = OWNER_CPU_1;
        break;
      case KEY_5:
        drawPlayerDesignsOnly = !drawPlayerDesignsOnly;
        paused = drawPlayerDesignsOnly;
        whichPlayerDesignsToShow = OWNER_CPU_2;
        break;
      case KEY_6:
        drawPlayerDesignsOnly = !drawPlayerDesignsOnly;
        paused = drawPlayerDesignsOnly;
        whichPlayerDesignsToShow = OWNER_CPU_3;
        break;
      case KEY_7:
        drawPlayerDesignsOnly = !drawPlayerDesignsOnly;
        paused = drawPlayerDesignsOnly;
        whichPlayerDesignsToShow = OWNER_CPU_4;
        break;
	  case KEY_3:
		changeMonth();
		break;
    }
  }
  if (typeof evt.preventDefault !== "undefined") {
    evt.preventDefault();
  }
}

function keyReleased(evt) {
  switch (evt.keyCode) {
      case KEY_W:
      case KEY_S:
        camPanYV = 0;
        break;
      case KEY_A:
      case KEY_D:
        camPanXV = 0;
        break;
  }
}

function setKeyHoldState(thisKey, thisSelection, setTo) {}
