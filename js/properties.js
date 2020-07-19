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
    this.restaurantType = '';

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
        let randomZone = randomIntFromInterval(1, 6);
        if (randomZone == 1) {
            this.zoned = "Commercial";
        } else if (randomZone == 2) {
            this.zoned = "Residential";
        } else if (randomZone == 3) {
            this.zoned = "Commercial";
            this.building = "restaurant";
            this.restaurantType = randomIntFromInterval(0, restaurantTypes.length-1);
		} else if (randomZone == 4) {
            this.zoned = "Residential";
            this.building = "apartment";
        } else if (randomZone == 5) {
            this.zoned = "Commercial";
            this.building = "OfficeBuilding";
		} else if (randomZone == 6) {
            this.zoned = "Residential";
            this.building = "basicDuplex";
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

        } else { // no building, draw a for sale sign based on commercial or residential
            drawBitmapAtLocation(propertyPic, isoDrawX, isoDrawY);
            if (this.zoned == "Commercial") {
                drawBitmapAtLocation(commercialForSaleSignPic, isoDrawX, isoDrawY);
            } else if (this.zoned == "Residential") {
                drawBitmapAtLocation(residentialForSaleSignPic, isoDrawX, isoDrawY);
            }
        }

        if (this.mouseSelected) {
            ui.drawPropertyUI(this.mouseSelected, isoDrawX, isoDrawY, this.width, this.height, this.propertyTileMapIndex,'$' + this.salePrice, this.zoned);
        } else if (this.mouseHovering) {
            colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + 32, isoDrawY + 60, "red", "8px Arial Black");
        } else {
            colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + 32, isoDrawY + 60, "white", "8px Arial Black");
        }
    }
}
