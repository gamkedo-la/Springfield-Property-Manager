const TILE_W = 100;
const TILE_H = 100;
const MAP_COLS = 16;
const MAP_ROWS = 12;

const ISO_GRID_W = 100;
const ISO_GRID_H = ISO_GRID_W / 2;

const GAME_WIDTH = MAP_COLS * TILE_W;
const GAME_HEIGHT = MAP_ROWS * TILE_H;

var isoDrawX = 0;
var isoDrawY = 0;

var cityHallisoTileLeftEdgeX = 0;
var cityHallisoTileTopEdgeX = 0;

var roomGrid = [  //0   2   4   6   8  10  12  14
					0,1,3,1,0,0,0,0,0,0,0,0,1,3,1,0, // 0
					1,1,6,1,1,1,1,1,1,1,1,1,1,3,1,1, // 1
					2,2,4,2,2,6,2,6,2,6,2,2,2,4,2,2, // 2
					1,1,3,1,1,1,1,1,1,1,1,1,1,3,1,1, // 3
					0,1,3,1,8,0,0,0,0,0,0,0,1,6,1,0, // 4
					0,1,3,1,0,0,0,0,0,0,0,0,1,3,1,0, // 5
					0,1,6,1,0,0,0,0,0,0,0,0,1,3,1,0, // 6
					0,1,3,1,0,0,0,0,0,0,0,0,1,6,1,0, // 7
					1,1,3,1,1,1,1,1,1,1,1,1,1,3,1,1, // 8
					5,5,4,5,5,6,5,5,6,5,5,5,5,4,5,5, // 9
					1,1,3,1,1,1,1,1,1,1,1,1,1,3,1,1, // 10
					0,1,3,1,0,0,0,0,0,0,0,0,1,3,1,0  // 11
					];

	const TILE_GRASS = 0;
	const TILE_PROPERTY = 1;
	const TILE_ROAD_WE = 2;
	const TILE_ROAD_NS = 3;
	const TILE_ROAD_INT = 4;
	const TILE_PERSON = 5;
	const TILE_VEHICLE = 6;
	const TILE_SNOW = 7;
	const TILE_CITY_HALL = 8;


function tileTypeHasTransparency(checkTileType){
	return
}

function drawLandScape(isBackground = true){
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileTopEdgeY = 0;
	var isoTileLeftEdgeX = 0;
	var isoTileTopEdgeX = 0;


	for(var eachRow = 0; eachRow < MAP_ROWS; eachRow++){
		tileLeftEdgeX = 0;
		for(var eachCol=0; eachCol<MAP_COLS; eachCol++) {
			if(trackTypeHere == TILE_CITY_HALL){
				cityHallisoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY) / 2;
				cityHallisoTileTopEdgeX = (tileLeftEdgeX + tileTopEdgeY) / 4;
			}
			
			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY) / 2;
			isoTileTopEdgeX = (tileLeftEdgeX + tileTopEdgeY) / 4;
			tileCoordToIsoCoord(eachCol, eachRow);
			var trackTypeHere = roomGrid[tileIndex];

			if (isBackground) {
				// Draw in the background

				if(tileTypeHasTransparency(trackTypeHere)) {
					canvasContext.drawImage(trackPics[TILE_ROAD], isoTileLeftEdgeX, isoTileTopEdgeX);
				}
				if(tileIndex != mouseOverIdx){
					if(trackTypeHere == TILE_CITY_HALL){
						if(gameMonth[whichMonth] == "January" || gameMonth[whichMonth] == "February" || gameMonth[whichMonth] == "December"){
								canvasContext.drawImage(trackPics[TILE_SNOW], isoTileLeftEdgeX, isoTileTopEdgeX);
						} else {
								canvasContext.drawImage(trackPics[TILE_GRASS], isoTileLeftEdgeX, isoTileTopEdgeX);
						}

					} else{
						canvasContext.drawImage(trackPics[trackTypeHere], isoTileLeftEdgeX, isoTileTopEdgeX);
					}
				}
				if(gameMonth[whichMonth] == "January" || gameMonth[whichMonth] == "February" || gameMonth[whichMonth] == "December"){
					//console.log(trackTypeHere);
					if(trackTypeHere == TILE_GRASS){
						canvasContext.drawImage(trackPics[TILE_SNOW], isoTileLeftEdgeX, isoTileTopEdgeX);
						//roomGrid[i] = TILE_SNOW;
					}
				} else {
					if(trackTypeHere == TILE_SNOW){
						canvasContext.drawImage(trackPics[TILE_GRASS], isoTileLeftEdgeX, isoTileTopEdgeX);
						//roomGrid[i] = TILE_GRASS;
					}
				}
				
			}
			else { 
				// Draw in the foreground
				if (trackTypeHere == TILE_ROAD_NS && tileIndex % 3 == 0) {
					canvasContext.drawImage(streetLightPic, 0, 0, streetLightPic.width/2, streetLightPic.height, isoTileLeftEdgeX-streetLightPic.height*0.8, isoTileTopEdgeX, streetLightPic.width/2, streetLightPic.height);
				}
				if (trackTypeHere == TILE_ROAD_WE && tileIndex % 3 == 0) {
					canvasContext.drawImage(streetLightPic, streetLightPic.width/2, 0, streetLightPic.width/2, streetLightPic.height, isoTileLeftEdgeX+streetLightPic.width, isoTileTopEdgeX-streetLightPic.height*0.7, streetLightPic.width/2, streetLightPic.height);
				}
			}
			
			tileIndex++;
			tileLeftEdgeX += TILE_W;
		} // end of each col

		tileTopEdgeY += TILE_H;
	} // end of each row

	if (isBackground) {
		// Draw in the background
	} 
	else {
		// Draw in the foreground
		canvasContext.drawImage(trackPics[TILE_CITY_HALL],cityHallisoTileLeftEdgeX,cityHallisoTileTopEdgeX);
	}
}



// fixme: this doesn't return the right value
// it returns the world data array index of a row and col
// but does not check what tile is stored there
// and will always return a truthy value except at 0,0
function isWallAtTileCoord(trackTileCol, trackTileRow){
				var tileIndex = roomTileToIndex(tileCol, tileRow);
				return tileIndex;
}

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}


var _lastTileCol, _lastTileRow; // used by people debug
function getTileIndexAtPixelCoord(pixelX,pixelY){ // pixelX and pixelY are in Game Space not Screen Space
	var tileCol = pixelX / TILE_W;
	var tileRow = pixelY / TILE_H;

	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	if(tileCol < 0 || tileCol >= MAP_COLS ||
		tileRow < 0 || tileRow >= MAP_ROWS) {
		document.getElementById("debugText").innerHTML = "out of bounds: " +pixelX+", "+pixelY;
		return undefined; // checking for out of bounds
	}

    var tileIndex = roomTileToIndex(tileCol, tileRow);
    
    // remember for optional use after running this function
    _lastTileCol = tileCol;
    _lastTileRow = tileRow;

	return tileIndex;
}

function roomTileToIndex(tileCol, tileRow) {
	return(tileCol + MAP_COLS*tileRow);
}

function tileCoordToIsoCoord(tileC, tileR ) {
	gameCoordToIsoCoord(tileC * TILE_W, tileR * TILE_H);
}

function gameCoordToIsoCoord (pixelX, pixelY) {

	var tileCFraction = pixelX / TILE_W;
	var tileRFraction = pixelY / TILE_H;

	isoDrawX = tileCFraction * (ISO_GRID_W/2) - tileRFraction * (ISO_GRID_W/2);
	isoDrawY = tileCFraction * (ISO_GRID_H/2) + tileRFraction * (ISO_GRID_H/2);
}

function gameCoordXToIsoCoordX(pixelX, pixelY){
	var tileCFraction = pixelX / TILE_W;
	var tileRFraction = pixelY / TILE_H;

	return tileCFraction * (ISO_GRID_W/2) - tileRFraction * (ISO_GRID_W/2);
}

function gameCoordYToIsoCoordY(pixelX, pixelY){
	var tileCFraction = pixelX / TILE_W;
	var tileRFraction = pixelY / TILE_H;


	isoDrawY = tileCFraction * (ISO_GRID_H/2) + tileRFraction * (ISO_GRID_H/2);
}

function isoCoordToGameCoord(pixelX, pixelY) {
	var workingX = pixelX + camPanX - ISO_GRID_W/2;
	var workingY = (pixelY*2) + camPanY; // 2X vertical, since isometric

	// accounting for affect of isometric motion on coordinate
	var unIsoX = workingX+workingY;
	var unIsoY = workingY-workingX;

	// going from game coordinate to tile index through normal calculation
	var indexUnderPixel = getTileIndexAtPixelCoord(unIsoX,unIsoY);

	// debugging output
	/*
	gameCoordToIsoCoord(unIsoX,unIsoY);
	var debugCoordX = isoDrawX;
	var debugCoordY = isoDrawY;
	colorRect(unIsoX,unIsoY,10,10,"red"); // check if iso motion aligns as up/down, side-side
	console.log("X: " + Math.floor(unIsoX) + " Y: " + Math.floor(unIsoY));
	*/
	return {x: unIsoX, y: unIsoY, idx: indexUnderPixel};
}
