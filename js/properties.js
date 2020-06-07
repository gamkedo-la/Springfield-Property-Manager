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
		drawBitmapAtLocation(propertyPic, this.x, this.y);
		
		if(this.zoned == "Commercial"){
			drawBitmapAtLocation(commercialForSaleSignPic, this.x + 50, this.y);	
		} else if(this.zoned == "Residential"){
			drawBitmapAtLocation(residentialForSaleSignPic, this.x + 50, this.y);
		}
			
		
		if(this.mouseSelected){
			colorRect(this.x + 6, this.y + 6, this.width - 12, this.height - 26, "white");
			colorRect(this.x + 6, this.y + this.height - 26, this.width - 12, this.height - 80, "blue");
			colorText("Lot Number " + this.propertyNumber, this.x + 8, this.y + 14, "black", "10px Arial Black");
			colorText("Sale Price: ", this.x + 18, this.y + 28, "black", "10px Arial Black");
			colorText(this.salePrice, this.x + 18, this.y + 40, "black", "10px Arial Black");
			colorText("Zoned: ", this.x + 18, this.y + 52, "black", "10px Arial Black");
			colorText(this.zoned, this.x + 18, this.y + 64, "black", "10px Arial Black");
			colorText("Purchase?", this.x + 18, this.y + 88, "red", "10px Arial Black");
			
		} else if (this.mouseHovering){
			colorText("Lot Number", this.x + 5, this.y + 50, "red", "14px Arial Black");
			colorText(this.propertyNumber, this.x + 40, this.y + 70, "red", "14px Arial Black");
		} else {
			colorText("Lot Number", this.x + 5, this.y + 50, "white", "14px Arial Black");
			colorText(this.propertyNumber, this.x + 40, this.y + 70, "white", "14px Arial Black");
		}
	}
}