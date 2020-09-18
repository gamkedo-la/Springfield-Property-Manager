const PROPERTY_FONT = "8px Arial Black"; // used in mouse hover info
const PROPERTY_TXTX = 32; // offsets from building xy
const PROPERTY_TXTY = 60;

const restaurantTypes = [
  {
    name : "italianFood",
    foodPrice : 50
  },
  {
    name : "chineseFood",
    foodPrice : 30
  },
  {
    name : "indianFood",
    foodPrice : 20
  }
];


/*
//Arrays that stores varnames to image assets
//Unused const arrays that will allow to add more variation of buildings if more art of the same type of building is added
const residentialDuplex    = [building2Pic];
const residentialApartment = [buildingPic];
const officeBasic          = [building3Pic];
*/

const officeLuxury         = [luxuryOfficeType1,luxuryOfficeType2];
const residentialLuxury    = [luxuryResidentialType1,luxuryResidentialType2];

let restaurantsAndShops  = new Map();
restaurantsAndShops.set("brazilianSteakhouse",brazilianSteakhousePic);
restaurantsAndShops.set("italianRestaurant",italianRestaurant);


function propertyClass() {
    this.height = 100;
    this.isoBuildingHeight = 50;
    this.width = 100;
    this.mouseHovering = false;
    this.mouseSelected = false;
    this.salePrice = 10000;
    this.zoned;
    this.building = "none";
    this.variation = "none";
    this.propertyTileMapIndex = -1; // set in  init()
    this.restaurantType = null;
	this.owner = OWNER_NONE;
	this.cornerLot = false;

    this.reset = function() {
        if (this.homeX == undefined) {
            for (var i = 0; i < roomGrid.length; i++) {
                if (roomGrid[i] == TILE_PROPERTY) {
                    var tileRow = Math.floor(i / MAP_COLS);
                    var tileCol = i % MAP_COLS;
                    this.homeX = tileCol * TILE_W;
                    this.homeY = tileRow * TILE_H;
                    if(gameMonth[whichMonth] == "January" || gameMonth[whichMonth] == "February" || gameMonth[whichMonth] == "December"){
						roomGrid[i] = TILE_SNOW;
					} else {
						roomGrid[i] = TILE_GRASS;
					}
                    break;
                }
            }
        }
        this.x = this.homeX;
        this.y = this.homeY;

		if(	this.propertyTileMapIndex == 17 || //corner lots
			this.propertyTileMapIndex == 19 ||
			this.propertyTileMapIndex == 49 ||
			this.propertyTileMapIndex == 51 ||
			this.propertyTileMapIndex == 28 ||
			this.propertyTileMapIndex == 30 ||
			this.propertyTileMapIndex == 60 ||
			this.propertyTileMapIndex == 62 ||
			this.propertyTileMapIndex == 129 ||
			this.propertyTileMapIndex == 131 ||
			this.propertyTileMapIndex == 161 ||
			this.propertyTileMapIndex == 163 ||
			this.propertyTileMapIndex == 140 ||
			this.propertyTileMapIndex == 142 ||
			this.propertyTileMapIndex == 172 ||
			this.propertyTileMapIndex == 174
			){
				this.cornerLot = true;
		}
    }

    this.init = function(propertyTileMapIndex) {
        this.propertyTileMapIndex = propertyTileMapIndex;
        let randomZone = randomIntFromInterval(1, 50);

		if (randomZone >= 1 && randomZone <= 10) {
			this.zoned = "Commercial";
			this.salePrice = 1000;
        } else if (randomZone >= 11 && randomZone <= 20) {
            this.zoned = "Residential";
			  this.salePrice = 500;
        } else if (randomZone >= 21 && randomZone <= 25) {
            this.zoned = "Commercial";
            this.building = "restaurant";
			this.salePrice = 10000;
            this.restaurantType = restaurantTypes[randomIntFromInterval(0, restaurantTypes.length-1)];
		} else if (randomZone >= 26 && randomZone <= 28) {
            this.zoned = "Residential";
            this.building = "apartment";
			this.salePrice = 5000;
        } else if (randomZone >= 29 && randomZone <= 30) {
            this.zoned = "Commercial";
            this.building = "OfficeBuilding";
			this.salePrice = 15000;
		} else if (randomZone >= 31 && randomZone <= 36) {
            this.zoned = "Residential";
            this.building = "basicDuplex";
			this.salePrice = 2500;
		} else if (randomZone >= 37 && randomZone <= 40) {
            this.zoned     = "Residential";
            this.building  = "LuxuryResidential";
            this.variation = residentialLuxury[randomIntFromInterval(0,residentialLuxury.length-1)];
			this.salePrice = 10000;
		} else if (randomZone == 41) {
            this.zoned = "Commercial";
            this.building = "brazilianSteakhouse";
			this.salePrice = 15000;
		} else if (randomZone == 42) {
            this.zoned = "Commercial";
            this.building = "LuxuryOffice";
            this.variation = officeLuxury[randomIntFromInterval(0,officeLuxury.length-1)];
			this.salePrice = 20000;
        } else if (randomZone >= 43 && randomZone <= 45) {
            this.zoned = "Commercial";
            this.building = "italianRestaurant";
            this.salePrice = 32000;
        } else if (randomZone >= 46 && randomZone <= 50) {
            this.zoned = "Commercial"; // not sure what to use here! FIXME
            this.building = "Park";
            this.salePrice = 5000;
        }

        this.reset();
    }

	this.salesScore = function(ownerData){
		var calculatedScore = 0;
		if(ownerData.cash < this.salePrice || this.owner != OWNER_NONE){
			return -1;
		}
		calculatedScore = this.salePrice;
		if(this.zoned == "Commercial"){
			//calculatedScore based on corner lots
			if(this.cornerLot){
				calculatedScore *= 2;
			}
			//if(apartmentAsANeighbor){
			// calculatedScore *= 2;
			//} if(iOwnTheNeighborProperty){
			// calculatedScore *= 2;
			//}
		}
		return calculatedScore;
	}

    this.draw = function() {
        gameCoordToIsoCoord(this.x, this.y);
        if (drawPlayerDesignsOnly && this.owner != OWNER_HUMAN) {
          return;
        }
        if (this.building == "restaurant") {
            drawBitmapAtLocation(restuarantPic, isoDrawX, isoDrawY - this.isoBuildingHeight);
		} else if (this.building == "apartment") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(buildingPic, isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "basicDuplex") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(building2Pic, isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "LuxuryResidential") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(this.variation, isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "OfficeBuilding") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(building3Pic, isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "brazilianSteakhouse") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(restaurantsAndShops.get(this.building), isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "italianRestaurant") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(restaurantsAndShops.get(this.building), isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "LuxuryOffice") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(this.variation, isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "Park") {
            
            this.isoBuildingHeight = 50;
            if(whichMonth==11 || whichMonth==0 || whichMonth==1) { // dec, jan, feb
                // winter snowy version
                drawBitmapAtLocation(parkWinterTilePic, isoDrawX, isoDrawY - this.isoBuildingHeight);
            } else { 
                // summer green grass version
                drawBitmapAtLocation(parkTilePic, isoDrawX, isoDrawY - this.isoBuildingHeight);
            }

        } else { // no building, draw a for sale sign based on commercial or residential
            drawBitmapAtLocation(propertyPic, isoDrawX, isoDrawY);
            if (this.zoned == "Commercial") {
                drawBitmapAtLocation(commercialForSaleSignPic, isoDrawX, isoDrawY);
            } else if (this.zoned == "Residential") {
                drawBitmapAtLocation(residentialForSaleSignPic, isoDrawX, isoDrawY);
            }
        }


        if (this.mouseSelected) {
            ui.drawPropertyUI(this.mouseSelected, isoDrawX, isoDrawY, this.width, this.height, this.propertyTileMapIndex,'$' + this.salePrice, this.zoned, this.owner);
        } else if (this.mouseHovering){
            colorTextShadow("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "rgba(255,64,64,1)", PROPERTY_FONT);
        } else {
			if(this.owner == OWNER_HUMAN){
				colorTextShadow("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "white", PROPERTY_FONT);
			} else if (this.owner == OWNER_CPU_1){
				colorTextShadow("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "blue", PROPERTY_FONT);
				drawBitmapAtLocation(playerOnePic, isoDrawX+40, isoDrawY);
			} else if (this.owner == OWNER_CPU_2){
				colorTextShadow("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "green", PROPERTY_FONT);
				drawBitmapAtLocation(playerTwoPic, isoDrawX+40, isoDrawY);
			} else if (this.owner == OWNER_CPU_3){
				colorTextShadow("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "purple", PROPERTY_FONT);
				drawBitmapAtLocation(playerThreePic, isoDrawX+40, isoDrawY);
			} else if (this.owner == OWNER_CPU_4){
				colorTextShadow("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "yellow", PROPERTY_FONT);
				drawBitmapAtLocation(playerFourPic, isoDrawX+40, isoDrawY);
			}
		}
    }
}
