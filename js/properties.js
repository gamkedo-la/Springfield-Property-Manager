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

function propertyClass() {
    this.height = 100;
    this.isoBuildingHeight = 50;
    this.width = 100;
    this.mouseHovering = false;
    this.mouseSelected = false;
    this.salePrice = 10000;
    this.zoned;
    this.building = "none";
    this.propertyTileMapIndex = -1; // set in  init()
    this.restaurantType = null;
	this.owner = OWNER_NONE;

    this.reset = function() {
        if (this.homeX == undefined) {
            for (var i = 0; i < roomGrid.length; i++) {
                if (roomGrid[i] == TILE_PROPERTY) {
                    var tileRow = Math.floor(i / MAP_COLS);
                    var tileCol = i % MAP_COLS;
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

    this.init = function(propertyTileMapIndex) {
        this.propertyTileMapIndex = propertyTileMapIndex;
        let randomZone = randomIntFromInterval(1, 41);
		
		if (randomZone >= 1 && randomZone <= 10) {
			this.zoned = "Commercial";
        } else if (randomZone >= 11 && randomZone <= 20) {
            this.zoned = "Residential";
        } else if (randomZone >= 21 && randomZone <= 25) {
            this.zoned = "Commercial";
            this.building = "restaurant";
            this.restaurantType = restaurantTypes[randomIntFromInterval(0, restaurantTypes.length-1)];
		} else if (randomZone >= 26 && randomZone <= 28) {
            this.zoned = "Residential";
            this.building = "apartment";
        } else if (randomZone >= 29 && randomZone <= 30) {
            this.zoned = "Commercial";
            this.building = "OfficeBuilding";
		} else if (randomZone >= 31 && randomZone <= 40) {
            this.zoned = "Residential";
            this.building = "basicDuplex";
		} else if (randomZone == 41) {
            this.zoned = "Commercial";
            this.building = "brazilianSteakhouse";
		} 
		
		
		
        this.reset();
    }

    this.draw = function() {
        gameCoordToIsoCoord(this.x, this.y);
        if (this.building == "restaurant") {
            drawBitmapAtLocation(restuarantPic, isoDrawX, isoDrawY - this.isoBuildingHeight);
		} else if (this.building == "apartment") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(buildingPic, isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "basicDuplex") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(building2Pic, isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "OfficeBuilding") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(building3Pic, isoDrawX, isoDrawY - this.isoBuildingHeight);

        } else if (this.building == "brazilianSteakhouse") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(brazilianSteakhousePic, isoDrawX, isoDrawY - this.isoBuildingHeight);

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
            colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "red", PROPERTY_FONT);
        } else {
			if(this.owner == OWNER_HUMAN){
				colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "white", PROPERTY_FONT);
			} else if (this.owner == OWNER_CPU_1){			
				colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "blue", PROPERTY_FONT);
			} else if (this.owner == OWNER_CPU_2){		
				colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "green", PROPERTY_FONT);
			} else if (this.owner == OWNER_CPU_3){			
				colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "purple", PROPERTY_FONT);
			} else if (this.owner == OWNER_CPU_4){			
				colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + PROPERTY_TXTX, isoDrawY + PROPERTY_TXTY, "yellow", PROPERTY_FONT);		
			}
		}
    }
}
