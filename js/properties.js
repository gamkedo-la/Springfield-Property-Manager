function propertyClass() {
	
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
		this.reset();
	}	
	 		
	this.draw = function(){
		drawBitmapAtLocation(propertyPic, this.x, this.y)
		colorText("Lot Number", this.x + 5, this.y + 50, "white", "14px Arial Black")
		colorText(this.propertyNumber, this.x + 40, this.y + 70, "white", "14px Arial Black")
	}
}