function vehicleClass() {
	const CAR_WIDTH = 24;
	const CAR_HEIGHT = 24;
	const BIKER_SPRITE_OFFSET = 2*CAR_WIDTH;
	this.x = 0;
	this.y = 110;
	this.velX = 1 + (-0.25 + Math.random() / 2);
	this.velY = 1 + (-0.25 + Math.random() / 2);
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
					if(tileRow === 2 || tileRow === 9) this.moveEast = true;
					if(tileCol === 2 || tileCol === 13) this.moveSouth = true;
					this.homeX = tileCol * TILE_W;
					this.homeY = tileRow * TILE_H;
					roomGrid[i] = TILE_ROAD_WE;
					break;
				}
			}
		}
		this.x = this.homeX;
		this.y = this.homeY;

		this.resetSprite();

		this.whichColor = randomIntFromInterval(1,7) - 1;
		if(this.moveEast) this.y += 20;
		if(this.moveSouth) this.x += 40;
	}

	this.resetSprite = function() {
		this.spriteSheetOffSet = randomIntFromInterval(0, vehiclesSheet.width/CAR_WIDTH - 1)*CAR_WIDTH;
		// There can only be one Biker Brick cameo on screen!
		if (this.spriteSheetOffSet == BIKER_SPRITE_OFFSET && vehicleList.filter(v => v.spriteSheetOffSet == BIKER_SPRITE_OFFSET).length > 1) {
			this.resetSprite();
		}
	};

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
			this.resetSprite();
		} else if (this.x < 0){
			this.x = GAME_WIDTH;
		} else if (this.y > GAME_HEIGHT){
			this.y = 0;
			this.resetSprite();
		} else if (this.y < 0){
			this.y = GAME_HEIGHT;
		}
	}

	this.draw = function () {
		if (drawPlayerDesignsOnly) {
			return;
		}
		gameCoordToIsoCoord(this.x, this.y);
		canvasContext.save();
		canvasContext.translate(isoDrawX+this.vehicleImageOffset, isoDrawY);
		if(this.moveSouth) {
			canvasContext.scale(-1, 1);
		}
		canvasContext.drawImage(vehiclesSheet,
								this.spriteSheetOffSet, 0, // sx, sy
								CAR_WIDTH, CAR_HEIGHT, // sWidth, sHeight
								0, 0, // dx, dy
								CAR_WIDTH, CAR_HEIGHT); // dWidth, dHeight
		canvasContext.restore();
	}
}
