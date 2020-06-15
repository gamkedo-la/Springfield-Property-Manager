const TILE_W = 100;
const TILE_H = 100;
const MAP_COLS = 16;
const MAP_ROWS = 12;

const ISO_GRID_W = 100;
const ISO_GRID_H = ISO_GRID_W / 2;
const ISO_TILE_GROUND_Y = 0;
const ISO_TILE_DRAW_W = 100;
const ISO_TILE_DRAW_H = 50;

var isoDrawX = 0;
var isoDrawY = 0;

var roomGrid = [
					1,0,3,1,0,1,0,1,0,1,0,1,0,3,1,0,
					0,0,3,0,0,0,0,0,0,0,0,0,0,3,0,0,
					5,5,4,5,5,6,5,5,5,5,5,6,5,4,5,5,
					1,0,3,1,0,1,0,1,0,1,0,1,0,3,1,0,
					0,0,3,0,0,0,0,0,0,0,0,0,0,3,0,0,
					1,0,3,1,0,0,0,0,0,0,0,1,0,3,1,0,
					0,0,3,0,0,0,0,0,0,0,0,0,0,3,0,0,
					1,0,3,1,0,1,0,1,0,1,0,1,0,3,1,0,
					0,0,3,0,0,0,0,0,0,0,0,0,0,3,0,0,			
					5,6,4,5,5,6,5,6,2,6,6,5,5,4,5,5,
					1,0,3,1,0,1,0,1,0,1,0,1,0,3,1,0,
					0,0,3,0,0,0,0,0,0,0,0,0,0,3,0,0
					];
					
	const TILE_GRASS = 0;
	const TILE_PROPERTY = 1;
	const TILE_ROAD_WE = 2;
	const TILE_ROAD_NS = 3;
	const TILE_ROAD_INT = 4;
	const TILE_PERSON = 5;
	const TILE_VEHICLE = 6;


function tileTypeHasTransparency(checkTileType){
	return 
}
					
function drawLandScape(){
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileTopEdgeY = 0;
	var isoTileLeftEdgeX = 0;
	var isoTileTopEdgeX = 0;
	
	for(var eachRow = 0; eachRow < MAP_ROWS; eachRow++){
		tileLeftEdgeX = 0;
		for(var eachCol=0; eachCol<MAP_COLS; eachCol++) {
			tileLeftEdgeX += TILE_W;
			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY) / 2;
			isoTileTopEdgeX = (tileLeftEdgeX + tileTopEdgeY) / 4;
			tileCoordToIsoCoord(eachCol, eachRow);
			var trackTypeHere = roomGrid[tileIndex];
			
			if(tileTypeHasTransparency(trackTypeHere)) {
				canvasContext.drawImage(trackPics[TILE_ROAD], isoTileLeftEdgeX, isoTileTopEdgeX);
			}
			if(tileIndex != mouseOverIdx){
				canvasContext.drawImage(trackPics[trackTypeHere], isoTileLeftEdgeX, isoTileTopEdgeX);
			}
			tileIndex++;				
		} // end of each col
		
		tileTopEdgeY += TILE_H;
		
	} // end of each row
}



function isWallAtTileCoord(trackTileCol, trackTileRow){
				var tileIndex = roomTileToIndex(tileCol, tileRow);
				return tileIndex;
}

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}			


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
			