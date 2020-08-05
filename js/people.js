const PEOPLE_FONT = "10px Arial Black"; // used for thought bubbles

const EAST = 1;
const WEST = 2;
const NORTH = 3;
const SOUTH = 4;
var peopleTextColor = "#fafdff";

function peopleClass() {

  const RANDOM_DIR_CHANGE_CHANCE = 0.01; // per frame per person

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
	this.displayMessageTimer = 0;
	this.messageStartTimer = randomIntFromInterval(100,300);
	this.messageStopTimer = randomIntFromInterval(500,700);

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

		this.whichColor = randomIntFromInterval(1,8) - 1;

		let randomDirection = randomIntFromInterval(1,2);

		if(randomDirection == EAST){
			this.moveEast = true;
		} else if (randomDirection == WEST){
			this.moveWest = true;
		}

		let randomSideWalkSide = randomIntFromInterval(1,2);
		//console.log(randomSideWalkSide);

		if (randomSideWalkSide == 2){
			this.y = this.y + 45;
    }

	}

	this.init = function(whichName) {
		this.myName = whichName;
		this.reset();

        // wealth, hunger, favorite food, etc
        this.characteristics = new peopleCharacteristics();
	}

	this.move = function() {
    if (this.characteristics.propertyToGo == null) {
      this.checkBoundaries();
      this.checkIntersections();
    }
    else {
      this.moveToProperty();
      this.buyFromProperty();
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

  this.moveToProperty = function(){
    this.moveEast = false;
		this.moveWest = false;
		this.moveNorth = false;
		this.moveSouth = false;
    if (this.characteristics.propertyToGo.x < this.x) {
      this.moveWest = true;
    }
    else if (this.characteristics.propertyToGo.x > this.x) {
      this.moveEast = true;
    }
    else if (this.characteristics.propertyToGo.y < this.y) {
      this.moveNorth = true;
    }
    else if (this.characteristics.propertyToGo.y > this.y) {
      this.moveSouth = true;
    }
  };

  this.buyFromProperty = function(){
    var property = this.characteristics.propertyToGo;
    if (property.x - 5 < this.x &&
        property.x + 5 > this.x &&
        property.y - 5 < this.y &&
        property.y + 5 > this.y) {
      if (property.building === "restaurant" ) {
        //console.log("Someone bought " + property.restaurantType.name);
        this.characteristics.cash -= property.restaurantType.foodPrice;
        this.characteristics.isHungry = false;
        this.characteristics.decideNextThingToBuy();
      }
      else if(property.zoned === "Residential"){
        // TODO: Buying home is not implemented.
        this.characteristics.decideNextThingToBuy();
      }
    }
  }

	this.changeDirection = function(){

    // reset
    this.moveEast = false;
		this.moveWest = false;
		this.moveNorth = false;
		this.moveSouth = false;

    // default: pure random
    let randomDirection = randomIntFromInterval(1,4);

    // navigate using the world heatmap?
    if (USE_HEATMAP) randomDirection = heatMapBestDirection("Commercial",this.x,this.y);

    // select a new direction
		if(randomDirection == EAST){
			this.moveEast = true;
		} else if (randomDirection == WEST){
			this.moveWest = true;
		} else if (randomDirection == NORTH){
			this.moveNorth = true;
		} else if (randomDirection == SOUTH){
			this.moveSouth = true;
		}
	}

	this.checkBoundaries = function(){
    // wrap around to the other side
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

    this.checkIntersections = function(){
		if((Math.random()<RANDOM_DIR_CHANGE_CHANCE) || // from time to time, do it randomly!

            // FIXME: account for any shape of map/road
            // and remove these hardcoded exact pixel locations
            // maybe we could look at roomGrid[] for TILE_ROAD_INT?

            (this.x == 103) && (this.y == 100) || //Intersection 1 (Top Left)
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
            (this.x == 697) && (this.y == 495)){
			this.changeDirection();
		}
	}

	this.draw = function () {
		gameCoordToIsoCoord(this.x, this.y);
		drawBitmapAtLocation(human, isoDrawX, isoDrawY);
		//colorCircle(isoDrawX, isoDrawY, 4, this.color[this.whichColor]);

		this.displayMessageTimer++;
		if(this.displayMessageTimer > this.messageStartTimer && this.displayMessageTimer < this.messageStopTimer){ // turn message on and off
            
            //Changes text color to be more visible depending on which month it is
			if(gameMonth[whichMonth] == "January" || gameMonth[whichMonth] == "February" || gameMonth[whichMonth] == "December"){
					peopleTextColor = '#16171a';
				} else {
					peopleTextColor = '#fafdff';
			}
			
			if(this.characteristics.isHungry){
				textBubble("I'm Hungry!", isoDrawX, isoDrawY - 5, peopleTextColor, PEOPLE_FONT);
			} else if(this.characteristics.isHomeless){
				textBubble("I need a place to rent!", isoDrawX, isoDrawY - 5, peopleTextColor, PEOPLE_FONT);
			}
		} else if(this.displayMessageTimer > randomIntFromInterval(1000,2000)) {// reset displayMessageTimer
			this.displayMessageTimer = 0;
		}
	}
}
