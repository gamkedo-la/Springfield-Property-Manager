function propertyClass() {
    this.height = 100;
    this.isoBuildingHeight = 50;
    this.width = 100;
    this.mouseHovering = false;
    this.mouseSelected = false;
    this.salePrice = "$10,000";
    this.zoned;
    this.building = "none";
    this.propertyTileMapIndex = -1; // set in  init()

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
        let randomZone = randomIntFromInterval(1, 5);
        if (randomZone == 1) {
            this.zoned = "Commercial";
        } else if (randomZone == 2) {
            this.zoned = "Residential";
        } else if (randomZone == 3) {
            this.zoned = "Commercial";
            this.building = "restaurant";
		} else if (randomZone == 4) {
            this.zoned = "Residential";
            this.building = "apartment";
        } else if (randomZone == 5) {
            this.zoned = "Commercial";
            this.building = "OfficeBuilding";
		}
        this.reset();
    }

    this.draw = function() {
        gameCoordToIsoCoord(this.x, this.y);
        if (this.building == "restaurant") {
            drawBitmapAtLocation(building3Pic, isoDrawX, isoDrawY - this.isoBuildingHeight);
		} else if (this.building == "apartment") {
            this.isoBuildingHeight = 50;
            drawBitmapAtLocation(buildingPic, isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else if (this.building == "OfficeBuilding") {
            this.isoBuildingHeight = 250;
            drawBitmapAtLocation(building2Pic, isoDrawX, isoDrawY - this.isoBuildingHeight);
        } else { // no building, draw a for sale sign based on commercial or residential
            drawBitmapAtLocation(propertyPic, isoDrawX, isoDrawY);
            if (this.zoned == "Commercial") {
                drawBitmapAtLocation(commercialForSaleSignPic, isoDrawX, isoDrawY);
            } else if (this.zoned == "Residential") {
                drawBitmapAtLocation(residentialForSaleSignPic, isoDrawX, isoDrawY);
            }
        }

        if (this.mouseSelected) {
            colorRect(isoDrawX + 6, isoDrawY + 6, this.width - 12, this.height - 26, "white");
            colorRect(isoDrawX + 6, isoDrawY + this.height - 26, this.width - 12, this.height - 80, "blue");
            colorText("Lot Number " + this.propertyTileMapIndex, isoDrawX + 8, isoDrawY + 14, "black", "10px Arial Black");
            colorText("Sale Price: ", isoDrawX + 18, isoDrawY + 28, "black", "10px Arial Black");
            colorText(this.salePrice, isoDrawX + 18, isoDrawY + 40, "black", "10px Arial Black");
            colorText("Zoned: ", isoDrawX + 18, isoDrawY + 52, "black", "10px Arial Black");
            colorText(this.zoned, isoDrawX + 18, isoDrawY + 64, "black", "10px Arial Black");
            colorText("Purchase?", isoDrawX + 18, isoDrawY + 88, "red", "10px Arial Black");

        } else if (this.mouseHovering) {
            colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + 32, isoDrawY + 60, "red", "8px Arial Black");
        } else {
            colorText("Lot #"+this.propertyTileMapIndex, isoDrawX + 32, isoDrawY + 60, "white", "8px Arial Black");
        }
    }
}