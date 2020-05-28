function peopleClass() {
	this.x = 0;
	this.y = 100;
	this.velX = .5;
	this.velY = .5;
	this.color = ["purple", "blue", "yellow","white","red","green","grey", "red"];
	this.whichColor = 0;
	this.moveWest = false;
	this.moveEast = false;
	this.moveSouth = false;
	this.moveNorth = false;
	this.dontMove = false;
	
	this.reset = function(){	
		if(this.homeX == undefined) {
			for(var i=0; i<roomGrid.length; i++){
				if( roomGrid[i] == TILE_PERSON) {
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
		let randomDirection = randomIntFromInterval(1,2);
		this.whichColor = randomIntFromInterval(1,8) - 1;
		if(randomDirection == 1){
			this.moveEast = true;
		} else if (randomDirection == 2){
			this.moveWest = true;
		}
		let randomSideWalkSide = randomIntFromInterval(1,2);
		console.log(randomSideWalkSide);
		if (randomSideWalkSide == 2){
			this.y = this.y + 45;
		}
	}

	this.init = function(whichName) {
		this.myName = whichName;
		this.reset();
	}
	this.move = function() {
		this.checkBoundaries();
		
		if((this.x == 103) && (this.y == 100) || //Intersection 1 (Top Left)
		   (this.x == 147) && (this.y == 100) ||
		   (this.x == 103) && (this.y == 145) ||
		   (this.x == 147) && (this.y == 145) ||
		   (this.x == 653) && (this.y == 100) || //Intersection 2 (Top Right)
		   (this.x == 697) && (this.y == 100) ||
		   (this.x == 653) && (this.y == 145) ||
		   (this.x == 697) && (this.y == 145) ||
		   (this.x == 103) && (this.y == 450) || //Intersection 3 (Bottom Left)
		   (this.x == 147) && (this.y == 450) ||
		   (this.x == 103) && (this.y == 495) ||
		   (this.x == 147) && (this.y == 495) ||
		   (this.x == 653) && (this.y == 450) || //Intersection 4 (Bottom Right)
		   (this.x == 697) && (this.y == 450) ||
		   (this.x == 653) && (this.y == 495) ||
		   (this.x == 697) && (this.y == 495)  		   
		){
			this.changeDirection();
		}
			
		if(this.moveWest){
			this.x = this.x - this.velX;
		} else if(this.moveEast){
			this.x = this.x + this.velX;
		} else if(this.moveSouth){
			this.y = this.y + this.velY;
		} else if(this.moveNorth){
			this.y = this.y - this.velY;
		} else {
			this.velX = 0;
			this.velY = 0;
		}
	}
	
	this.changeDirection = function(){
		let randomDirection = randomIntFromInterval(1,4);
		this.moveEast = false;
		this.moveWest = false;
		this.moveNorth = false;
		this.moveSouth = false;
		if(randomDirection == 1){
			this.moveEast = true;
		} else if (randomDirection == 2){
			this.moveWest = true;
		} else if (randomDirection == 3){
			this.moveNorth = true;
		} else if (randomDirection == 4){
			this.moveSouth = true;
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
		 colorCircle(this.x, this.y, 4, this.color[this.whichColor]);
	}
}