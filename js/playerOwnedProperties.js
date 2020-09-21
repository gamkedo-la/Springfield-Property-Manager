    drawOwnedProperties = function() {
        var player = ownerList[0]
    	var textX = 10
		var textY = 150;
    	
        colorTextShadow("Your Properties: ", textX, textY, "lightgreen", "18px Arial Black");
		for(var i = 0; i < player.propertyOwned.length; i++){
            colorTextShadow("Lot #" + player.propertyOwned[i], textX, textY+20, "white");
            // Need to get building design type from property class
            colorTextShadow("Design Type: " + player.propertyOwned[i], textX, textY+40, "white");
            textY += 60;
		}
	}