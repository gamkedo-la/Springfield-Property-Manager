function vehicleClass() {
	this.x = 0;
	this.y = 110;
	this.velX = 1;
	this.velY = 1;
	this.moveWest = false;
	this.moveEast = false;
	this.moveSouth = false;
	this.moveNorth = false;
	this.dontMove = false;

	this.reset = function(){				
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == TILE_VEHICLE) {
					var tileRow = Math.floor(i/MAP_COLS);
					var tileCol	= i%MAP_COLS;
					this.homeX = tileCol * TILE_W;
					this.homeY = tileRow * TILE_H;
					roomGrid[i] = TILE_ROAD_WE;
					break;
				}
			}
		}
		this.x = this.homeX;
		this.y = this.homeY;
		
		let randomDirection = randomIntFromInterval(1,2)
		if(randomDirection == 1){
			this.moveEast = true;
			this.y = this.y + 20;
		} else if (randomDirection == 2){
			this.moveWest = true;
		}
	}

	
	this.init = function(whichGraphic, whichName) {
		this.color = whichGraphic;
		this.myName = whichName;
		this.reset();
	}
	this.move = function() {
		this.checkBoundaries();
		
		if(this.moveWest){
			this.x = this.x - this.velX;
		} else if(this.moveEast){
			this.x = this.x + this.velX;
		} else if(this.moveSouth){
			this.y = this.y + this.velY;
		} else if(this.moveNorth){
			this.x = this.y - this.velY;
		} else {
			this.velX = 0;
			this.velY = 0;
		}
	}
	
	this.checkBoundaries = function(){
		if(this.x > canvas.width){
			this.x = 0;
		} else if (this.x < 0){
			this.x = canvas.width;
		} else if (this.y > canvas.height){
			this.y = 0;
		} else if (this.y < 0){
			this.y = canvas.height;
		}
	}
	
	this.draw = function () {
		colorRect(this.x, this.y + 10, 20, 10, this.color);
	}
}