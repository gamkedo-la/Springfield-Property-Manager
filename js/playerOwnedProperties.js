    drawOwnedProperties = function() {
        var player = ownerList[0]
    	var textX = 0
		var textY = 150;
    	
        colorText("Your Properties: ", textX, textY, "white");
		for(var i = 0; i < player.propertyOwned.length; i++){
            colorText("Lot #" + player.propertyOwned[i], textX, textY+20, "white");
            // Need to get building design type from property class
            colorText("Design Type: " + player.propertyOwned[i], textX, textY+40, "white");
            textY += 60;
		}
	}