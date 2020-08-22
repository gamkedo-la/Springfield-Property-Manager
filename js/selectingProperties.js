function checkForPropertyHovering() {
	var selectedTile = isoCoordToGameCoord(mousePosX, mousePosY);
	var selectedTileIndex = selectedTile.idx;
	mouseOverIdx = selectedTileIndex;

	for(i = 0; i < propertyList.length; i++) {
		gameCoordToIsoCoord(propertyList[i].x, propertyList[i].y);
		if (mousePosX > isoDrawX + (TILE_W/2) - camPanX && mousePosX < (isoDrawX + (TILE_W/2) - camPanX + (TILE_W/2)) &&
			mousePosY > isoDrawY - (camPanY/2) && mousePosY < (isoDrawY - (camPanY/2) + (TILE_H/2) ))
			{
			propertyList[i].mouseHovering = true;
		} else {
			propertyList[i].mouseHovering = false;
		}
	}
}

function checkForPropertySelection() {
	isoCoordToGameCoord(mousePosX, mousePosY);
	ownerList[OWNER_HUMAN].atProperty = null;

	for(i = 0; i < propertyList.length; i++) {
		gameCoordToIsoCoord(propertyList[i].x, propertyList[i].y);
		if (mousePosX > isoDrawX + (TILE_W/2) - camPanX && mousePosX < (isoDrawX + (TILE_W/2) - camPanX + (TILE_W/2)) &&
			mousePosY > isoDrawY - (camPanY/2) && mousePosY < (isoDrawY - (camPanY/2) + (TILE_H/2) ))
		{
			validSelectSFX.play();
			propertyList[i].mouseSelected = true;
			ownerList[OWNER_HUMAN].atProperty = propertyList[i];
		} else {
			invalidSelectSFX.play();
			propertyList[i].mouseSelected = false;
			ui.drawPropertyUI(false);
		}
	}
}
