var selectedProperty;

function checkForPropertyHovering(){
	for(i = 0; i < propertyList.length; i++){
		if (mousePosX > propertyList[i].x && mousePosX < (propertyList[i].x + propertyList[i].width) &&
			mousePosY > propertyList[i].y && mousePosY < (propertyList[i].y + propertyList[i].height ))
			{
			propertyList[i].mouseHovering = true;
		} else {
			propertyList[i].mouseHovering = false;
		}
	}
}

function checkForPropertySelection(){
	for(i = 0; i < propertyList.length; i++){
		if (mousePosX > propertyList[i].x && mousePosX < (propertyList[i].x + propertyList[i].width) &&
			mousePosY > propertyList[i].y && mousePosY < (propertyList[i].y + propertyList[i].height ))
			{
			propertyList[i].mouseSelected = true;
		} else {
			propertyList[i].mouseSelected = false;
		}
	}
}
	
	
	