
const DEBUG_PEOPLE = false; // draw extra debug dot and iso rectangle to show where they think they are
const AVOID_WALKING_ON_STREET  = false; // turned off due to iso coord bugs
const PEOPLE_FONT = "10px Arial Black"; // used for thought bubbles
const EAST = 1;
const WEST = 2;
const NORTH = 3;
const SOUTH = 4;
var peopleTextColor = "#fafdff";

// the offset from top left corner of sprite
// to the center bottom where feet are
// FIXME these seem wrong - not sure why
const peopleFootOffsetX = 8;
const peopleFootOffsetY = 16;
// offset from person xy to status effect bubble
const peopleStatusOffsetX = -18;
const peopleStatusOffsetY = -65;


function addPerson(){
	newObject = new peopleClass();
	newObject.init("1");
	newObject.x = 0;
	newObject.y = 100;
	peopleList.push(newObject);
}

function peopleClass() {

  const RANDOM_DIR_CHANGE_CHANCE = 0.01; // per frame per person

    this.name = "Person" + Math.round(1000+Math.random()*9000); // for debugging
    this.x = 0;
	this.y = 100;
	this.velX = .5;
	this.velY = .5;
	this.color = ["purple", "blue", "yellow","white","red","green","grey", "red"];
	this.whichColor = 0;
	this.myPic = humanPic;
	this.moveWest = false;
	this.moveEast = false;
	this.moveSouth = false;
	this.moveNorth = false;
	this.dontMove = false;
	this.displayMessageTimer = 0;
	this.messageStartTimer = randomIntFromInterval(100,300);
	this.messageStopTimer = randomIntFromInterval(500,700);

	updatePopulationGUI();

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
        // console.log("Person init: " + whichName);
        this.myName = whichName;
		this.randomPicture();
		this.reset();

        this.characteristics = new peopleCharacteristics();
	}
	
	this.randomPicture = function(){
		var randomPictureNumber = randomIntFromInterval(1,7);
		// console.log(randomPictureNumber);
		switch (randomPictureNumber) {
			case 1:
				this.myPic = humanPic;
			break;
			case 2:
				this.myPic = human2Pic;
			break;
			case 3:
				this.myPic = human3Pic;
			break;
			case 4:
				this.myPic = human4Pic;
			break;
			case 5:
				this.myPic = human5Pic;
			break;
			case 6:
				this.myPic = human6Pic;
			break;
			case 7:
				this.myPic = human7Pic;
			break;
		}
	}

	this.move = function() {
    if (this.characteristics.propertyToGo == null) {
      this.checkBoundaries();
      this.checkIntersections();
      if (AVOID_WALKING_ON_STREET) this.checkForDanger(); // avoid walking on the street
    }
    else {
        if (AVOID_WALKING_ON_STREET) this.checkForDanger(); // FIXME: this interferes with moving toward houses
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
        console.log("Someone bought food at " + property.restaurantType.name);
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

    // avoid walking in front of cars!
    this.checkForDanger = function() {
        const spd = 4; // pixels movement when we jump off road

        ///////////////////////////////////////////////////////////////////////////
        // this function returns the wrong tile
        var HACK = TILE_W/2; // temp workaround using guesswork
        //var tileType = isWallAtTileCoord(tileIndex) // this function is broken
        ///////////////////////////////////////////////////////////////////////////
        var tileIndex = getTileIndexAtPixelCoord(this.x-HACK-HACK,this.y+HACK); // FIXME!!!!
        var tileFound = roomGrid[tileIndex];

        this.standingOnTileIndex = tileIndex;
        this.standingOnTileRow = _lastTileRow;
        this.standingOnTileCol = _lastTileCol;
        this.standingOnTileType = tileFound;
        this.standingOnTileDesc = "UNKNOWN";

        //console.log("WALKING ON TILE TYPE " + tileFound);
        switch (tileFound) {
            case TILE_ROAD_NS:
            case TILE_ROAD_WE:
            case TILE_ROAD_INT:
                this.standingOnTileDesc = "ROAD";
                // on the street! lets shift over a bit
                //console.log("crossing the street at "+this.x+","+this.y+" which is tile type " + tileFound);
                // handle diagonal movement
                if (this.moveEast && this.moveNorth)      { this.x+=spd; this.y+=spd; }
                else if (this.moveWest && this.moveNorth) { this.x-=spd; this.y+=spd; }
                else if (this.moveEast && this.moveSouth) { this.x+=spd; this.y-=spd; }
                else if (this.moveWest && this.moveSouth) { this.x-=spd; this.y-=spd; }
                // if only moving nsew, arbitrarily pick a side
                else if (this.moveWest)  { this.x-=spd; this.y+=spd; }
                else if (this.moveEast)  { this.x+=spd; this.y+=spd; }
                else if (this.moveNorth) { this.x+=spd; this.y-=spd; }
                else if (this.moveSouth) { this.x-=spd; this.y+=spd; }
                break;
            case TILE_GRASS:
            case TILE_SNOW:
                // we are perfectly safe here!
                this.standingOnTileDesc = "GROUND";
                break;
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
		if (drawPlayerDesignsOnly) {
			return;
		}
        gameCoordToIsoCoord(this.x, this.y); // warning: mangles globals
        // used for debugging
        //if (DEBUG_PEOPLE) colorIsoRect(isoDrawX,isoDrawY,TILE_W / 2,TILE_H / 2,"red");

        // FIXME: these feel offset from where the game thinks they are at
        drawBitmapAtLocation(this.myPic, isoDrawX-peopleFootOffsetX, isoDrawY-peopleFootOffsetY);

		this.displayMessageTimer++;
		if(this.displayMessageTimer > this.messageStartTimer && this.displayMessageTimer < this.messageStopTimer){ // turn message on and off

            //Changes text color to be more visible depending on which month it is
			if(gameMonth[whichMonth] == "January" || gameMonth[whichMonth] == "February" || gameMonth[whichMonth] == "December"){
					peopleTextColor = '#16171a';
				} else {
					peopleTextColor = '#fafdff';
			}

            // STATUS EFFECTS
            if(this.characteristics.isHungry){

                //textBubble("I'm Hungry!", isoDrawX, isoDrawY - 5, peopleTextColor, PEOPLE_FONT);
                drawBitmapAtLocation(statusBubble, isoDrawX+peopleStatusOffsetX, isoDrawY+peopleStatusOffsetY);
                drawBitmapAtLocation(statusHunger, isoDrawX+peopleStatusOffsetX, isoDrawY+peopleStatusOffsetY);

			} else if(this.characteristics.isHomeless){

                //textBubble("I need a place to rent!", isoDrawX, isoDrawY - 5, peopleTextColor, PEOPLE_FONT);
                drawBitmapAtLocation(statusBubble, isoDrawX-peopleStatusOffsetX, isoDrawY-peopleStatusOffsetY);
                drawBitmapAtLocation(statusHomeless, isoDrawX-peopleStatusOffsetX, isoDrawY-peopleStatusOffsetY);

			}
		} else if(this.displayMessageTimer > randomIntFromInterval(1000,2000)) {// reset displayMessageTimer
			this.displayMessageTimer = 0;
        }
        if (DEBUG_PEOPLE) {
            // the dot is at the foot position
            colorCircle(isoDrawX, isoDrawY, 1, this.color[this.whichColor]);
            colorTextCenter(this.name+ " standing on " + this.standingOnTileDesc,isoDrawX,isoDrawY+10,'black',"7px Arial");
            colorTextCenter('TILE #'+this.standingOnTileIndex+' ('+this.standingOnTileRow+','+this.standingOnTileCol+')',isoDrawX,isoDrawY+20,'black',"7px Arial");
            colorTextCenter('POS:'+this.x.toFixed(0)+','+this.y.toFixed(0),isoDrawX,isoDrawY+30,'black',"7px Arial");
            // draw a tile at the TILE location we are standing on to bugfix stuff
            // careful! this changes isoDrawX and isoDrawY globals!
            tileCoordToIsoCoord(this.standingOnTileRow, this.standingOnTileCol); // WARNING mangles globals
            colorIsoRect(isoDrawX,isoDrawY,TILE_W / 2,TILE_H / 2,"rgba(0,0,0,0.15)",0,'black');
        }
	} // draw
} // class
