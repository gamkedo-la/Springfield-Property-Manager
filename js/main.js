const USE_FULLSCREEN_LIGHTNING_FLASHES = false;

var framesPerSecond = 60;

var canvas;
var canvasContext;

var zoom = 0;
const ZOOM_MAX = 0.3;
const ZOOM_MIN = -0.3;

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
var playerPaused = false;
var gameIsStarted = false;

var siteActivatedWithClick = false;

var audioButton;
var helpButton;

var drawPlayerDesignsOnly = false;
var whichPlayerDesignsToShow;

function changeState(toState) {
  if (inGameMenu != null) {
    inGameMenu.exit();
  }
  inGameMenu = toState;
  if (inGameMenu != null) {
    inGameMenu.init();
  }
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", calculateMousePos);
  canvas.addEventListener("wheel", handleMouseWheel);
  onResize();

  initializeAssets();
  createButtons();
  loadImages();
  initInput();
  setUpOwners();
  setUpClouds();
};

function onResize() {
  console.log("resizing screen to "+window.innerWidth+"x"+window.innerHeight);
  // make the canvas full size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // re-center the world
  camPanX = -1 * Math.round(canvas.width / 2 + 100);
  camPanY = -1 * Math.round(canvas.height / 2 - 300);
}

function imageLoadingDoneSoStartGame() {
  setInterval(function () {
    playBackgroundMusic();
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
}

function initializeAssets() {
  var tileIndex = 0;
  var tileLeftEdgeX = 0;
  var tileTopEdgeY = 0;

  for (var eachRow = 0; eachRow < MAP_ROWS; eachRow++) {
    tileLeftEdgeX = 0;

    for (var eachCol = 0; eachCol < MAP_COLS; eachCol++) {
      if (roomGrid[tileIndex] == TILE_PERSON) {
        newObject = new peopleClass();
        newObject.init("Person from " + eachCol + "," + eachRow);
        peopleList.push(newObject);
      } else if (roomGrid[tileIndex] == TILE_VEHICLE) {
        newObject = new vehicleClass();
        newObject.init("Vehicle from " + eachCol + "," + eachRow);
        vehicleList.push(newObject);
      } else if (roomGrid[tileIndex] == TILE_PROPERTY) {
        newObject = new propertyClass();
        newObject.init(tileIndex);
        newObject.salesPrice = randomIntFromInterval(1000, 5000);
        propertyList.push(newObject);
      }

      tileTopEdgeY += TILE_H;
      tileIndex++;
    }
  }
}

function createButtons() {
  audioButton = new audioButtonClass();
  helpButton = new helpMenu();
}

function moveEverything() {
  if (gameIsStarted === false) {
    Menu.update();
    return;
  }
   console.log(paused);
  if (paused || playerPaused || openningStoryScreen || announcementIsPosted()) {
    return;
  }

  for (var i = 0; i < vehicleList.length; i++) {
    vehicleList[i].move();
  }
  for (var i = 0; i < peopleList.length; i++) {
    peopleList[i].move();
  }
  for (var i = 0; i < cloudList.length; i++) {
    cloudList[i].move();
  }
  checkForPropertyHovering();
  updateTime();

  for (var i = 0; i < ownerList.length; i++) {
    ownerList[i].checkForPropertiesOwned();
  }

  audioButton.checkHover();

  helpButton.hoverCheck();

  if (inGameMenu != null) {
    inGameMenu.update();
  }
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(),
    root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  mouseX += -mouseX * zoom + (zoom * canvas.width) / 2;
  mouseY += -mouseY * zoom + (zoom * canvas.height) / 2;
  // console.log(mouseX + " / "+ mouseY)
  return {
    x: mouseX,
    y: mouseY,
  };
}

function handleMouseWheel(evt) {
  zoom += evt.deltaY * -0.01;
  zoom = Math.min(Math.max(ZOOM_MIN, zoom), ZOOM_MAX);
  isZooming = true;
}

function drawEverything() {
  
  canvasContext.clearRect(0,0,canvas.width, canvas.height); // leave empty (see thru)

  if (isLightingStrikingNow) {
    isLightingStrikingNow = false;
    if (USE_FULLSCREEN_LIGHTNING_FLASHES) {
        colorRect(0, 0, canvas.width, canvas.height, "#36373a");
    }
  }

  var showInGameUI = gameIsStarted && openningStoryScreen == false;
  if (isHudShown && showInGameUI && uiContainerMain.style.display == "none") {
    uiContainerMain.style.display = "flex";
  } else if (showInGameUI == false && uiContainerMain.style.display != "none") {
    uiContainerMain.style.display = "none";
  }

  if (gameIsStarted === false) {
    Menu.draw();
  } else if (openningStoryScreen) {
    drawOpenningStory();
  } else {
    //in game
    if (rightClicked) {
      camPanX += mouseMovementX;
      camPanY += mouseMovementY * 2;
    }

    canvasContext.save();

    canvasContext.translate(canvas.width / 2, canvas.height / 2);
    canvasContext.scale(1 + zoom, 1 + zoom);
    canvasContext.translate(-canvas.width / 2, -canvas.height / 2);

    canvasContext.save();
    canvasContext.translate(-camPanX, -camPanY / 2);
    var isBackground = true;

    drawLandScape(isBackground); // Draw in the background, snow, grass, etc.

    critters.drawFlowers();

    for (var i = 0; i < vehicleList.length; i++) {
      vehicleList[i].draw();
    }
    for (var i = 0; i < peopleList.length; i++) {
      peopleList[i].draw();
      //console.log(peopleList[0].displayMessageTimer);
    }
    canvasContext.restore();
    //colorRect(debugBoxX, debugBoxY, 5, 5, "red");

    for (i = 0; i < propertyList.length; i++) {
      if (propertyList[i].mouseHovering || propertyList[i].mouseSelected) {
        gameCoordToIsoCoord(propertyList[i].x, propertyList[i].y);
        colorIsoRect(
          isoDrawX + TILE_W / 2 - camPanX,
          isoDrawY - camPanY / 2,
          TILE_W / 2,
          TILE_H / 2,
          "yellow"
        );
      }
    }

    canvasContext.save();
    canvasContext.translate(-camPanX, -camPanY / 2);

    for (var i = 0; i < propertyList.length; i++) {
      propertyList[i].draw();
    }

    drawLandScape(!isBackground); // Draw in the foreground, so that other properties are not drawn above buildings that are too high (e.g. the city hall).

    if(playerPaused == false){
      critters.draw(); // birds, butterflies, cats, and dogs

      for (var i = 0; i < cloudList.length; i++) {
        cloudList[i].draw();
      }
   } 
   
   canvasContext.restore();
   canvasContext.restore();

   if (playerPaused) {
      canvasContext.globalAlpha = 0.5;
      colorRect(0, 0, canvas.width, canvas.height, "black"); // 50% black overlay
      canvasContext.globalAlpha = 1.0;
      colorTextShadow("Press P To UNPAUSE",  350, 350, "#FFFFFF", "35px Arial");
   }

    audioButton.draw();
	
	ui.draw();
	
	drawLandLordEventAnnouncementIfActive();

    helpButton.draw();

    if (isHudShown) {
      if (inGameMenu != null) {
        canvasContext.globalAlpha = 0.5;
        colorRect(0, 0, canvas.width, canvas.height, "black"); // 50% black overlay
        canvasContext.globalAlpha = 1.0;
        inGameMenu.draw();
      }

      for (var i = 0; i < ownerList.length; i++) {
        ownerList[i].drawStatus();
      }

      drawOwnedProperties();
      displayGameTime();
    }
  }
}
