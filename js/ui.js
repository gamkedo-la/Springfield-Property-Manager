const PROPERTY_UI_WIDTH = 592;

function uiClass() {
    this.propertyUI = {
        "drawing": false,
        "x": 0,
        "y": 0,
        "width": 0,
        "height": 0,
        "tilemapIndex": 0,
        "salePrice": 0,
        "zoned": false
    };

    this.draw = function() {
        if (this.propertyUI.drawing) {
            colorRect(this.propertyUI.x + 6, this.propertyUI.y + 6, this.propertyUI.width, this.propertyUI.height, "white");
						colorRect(this.propertyUI.x + 6, this.propertyUI.y + this.propertyUI.height - 14, this.propertyUI.width, this.propertyUI.height - 80, "blue");

						colorText("Lot Number ", this.propertyUI.x + 15, this.propertyUI.y + 14, "black", "10px lexendpeta");
						colorText(this.propertyUI.tilemapIndex, this.propertyUI.x + 45, this.propertyUI.y + 25, "black", "10px lexendpeta");

            colorText("Sale Price: ", this.propertyUI.x + 18, this.propertyUI.y + 42, "black", "10px lexendpeta");
						colorText(this.propertyUI.salePrice, this.propertyUI.x + 30, this.propertyUI.y + 52, "black", "10px lexendpeta");

            colorText("Zoned: ", this.propertyUI.x + 33, this.propertyUI.y + 68, "black", "10px lexendpeta");
						colorText(this.propertyUI.zoned, this.propertyUI.x + 18, this.propertyUI.y + 78, "black", "10px lexendpeta");

            colorText("Owner:" + this.propertyUI.owner, this.propertyUI.x + 8, this.propertyUI.y + 98, "white", "9px lexendpeta");
        }
    };

    this.drawPropertyUI = function(drawing, x, y, width, height, tilemapIndex, salePrice, zoned, ownedBy) {
        this.propertyUI.drawing = drawing;
        this.propertyUI.x = x-camPanX*(1.0+zoom*0.125); // not quite right, couldn't figure out for launch, but close enough to be playable
        this.propertyUI.y = y-camPanY*0.5*(1.0+zoom);
        this.propertyUI.width = width;
        this.propertyUI.height = height;
        this.propertyUI.tilemapIndex = tilemapIndex;
        this.propertyUI.salePrice = salePrice;
        this.propertyUI.zoned = zoned;
				this.propertyUI.owner = getOwnerName(ownedBy);
    };
}
