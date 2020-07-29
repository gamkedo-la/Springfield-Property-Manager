function vehicleClass() {
	const CAR_WIDTH = 24;
	const CAR_HEIGHT = 24;
	this.x = 0;
	this.y = 110;
	this.velX = 1;
	this.velY = 1;
	this.color = ["purple", "blue", "yellow","white","red","green","grey"];
	this.whichColor = 0;
	this.moveWest = false;
	this.moveEast = false;
	this.moveSouth = false;
	this.moveNorth = false;
	this.dontMove = false;
	this.vehicleImageOffset = 20;

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
		
		this.spriteSheetOffSet = randomIntFromInterval(0, vehiclesSheet.width/CAR_WIDTH + 1)*CAR_WIDTH;
		console.log('OFFSET', this.spriteSheetOffSet);
		
		let randomDirection = randomIntFromInterval(2)
		this.whichColor = randomIntFromInterval(1,7) - 1;
		//if(randomDirection == 1){
			this.moveEast = true;
			this.y = this.y + 20;
		//} else if (randomDirection == 2){
		//	this.moveWest = true;
		//}
	}

	this.init = function(whichName) {
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
		if(this.x > GAME_WIDTH){
			this.x = 0;
		} else if (this.x < 0){
			this.x = GAME_WIDTH;
		} else if (this.y > GAME_HEIGHT){
			this.y = 0;
		} else if (this.y < 0){
			this.y = GAME_HEIGHT;
		}
	}
	
	this.draw = function () {
		gameCoordToIsoCoord(this.x, this.y);
		canvasContext.save();
		canvasContext.translate(isoDrawX+this.vehicleImageOffset, isoDrawY);
		canvasContext.drawImage(vehiclesSheet,
								this.spriteSheetOffSet, 0, // sx, sy
								CAR_WIDTH, CAR_HEIGHT, // sWidth, sHeight
								0, 0, // dx, dy
								CAR_WIDTH, CAR_HEIGHT); // dWidth, dHeight
		canvasContext.restore();
	}
}
