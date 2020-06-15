function propertyClass() {
	this.height = 100;
	this.width = 100;
	this.mouseHovering = false;
	this.mouseSelected = false;
	this.salePrice = "$10,000";
	this.zoned;
	
	this.reset = function(){				
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == TILE_PROPERTY) {
					var tileRow = Math.floor(i/MAP_COLS);
					var tileCol	= i%MAP_COLS;
					this.homeX = tileCol * TILE_W;
					this.homeY = tileRow * TILE_H;
					roomGrid[i] = TILE_GRASS;
					break;
				}
			}
		}
		this.x = this.homeX;
		this.y = this.homeY;
	}

	
	this.init = function(propertyName) {
		this.propertyNumber = propertyName;
		let randomZone = randomIntFromInterval(1,2);
		if(randomZone == 1){
			this.zoned = "Commercial";
		} else if (randomZone == 2){
			this.zoned = "Residential";
		}
		this.reset();
	}	
	 		
	this.draw = function(){
		gameCoordToIsoCoord(this.x, this.y);
		drawBitmapAtLocation(propertyPic, isoDrawX, isoDrawY+24);
		
		if(this.zoned == "Commercial"){
			drawBitmapAtLocation(commercialForSaleSignPic, isoDrawX + 50, isoDrawY);	
		} else if(this.zoned == "Residential"){
			drawBitmapAtLocation(residentialForSaleSignPic, isoDrawX + 50, isoDrawY);
		}
			
		
		if(this.mouseSelected){
			colorRect(isoDrawX + 6, isoDrawY + 6, this.width - 12, this.height - 26, "white");
			colorRect(isoDrawX + 6, isoDrawY + this.height - 26, this.width - 12, this.height - 80, "blue");
			colorText("Lot Number " + this.propertyNumber, isoDrawX + 8, isoDrawY + 14, "black", "10px Arial Black");
			colorText("Sale Price: ", isoDrawX + 18, isoDrawY + 28, "black", "10px Arial Black");
			colorText(this.salePrice, isoDrawX + 18, isoDrawY + 40, "black", "10px Arial Black");
			colorText("Zoned: ", isoDrawX + 18, isoDrawY + 52, "black", "10px Arial Black");
			colorText(this.zoned, isoDrawX + 18, isoDrawY + 64, "black", "10px Arial Black");
			colorText("Purchase?", isoDrawX + 18, isoDrawY + 88, "red", "10px Arial Black");
			
		} else if (this.mouseHovering){
			colorText("Lot Number", isoDrawX + 5, isoDrawY + 50, "red", "14px Arial Black");
			colorText(this.propertyNumber, isoDrawX+ 40, isoDrawY + 70, "red", "14px Arial Black");
		} else {
			colorText("Lot Number", isoDrawX + 5, isoDrawY + 50, "white", "14px Arial Black");
			colorText(this.propertyNumber, isoDrawX + 40, isoDrawY + 70, "white", "14px Arial Black");
		}
	}
}