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
            colorRect(this.propertyUI.x + 6, this.propertyUI.y + 6, this.propertyUI.width - 12, this.propertyUI.height - 26, "white");
            colorRect(this.propertyUI.x + 6, this.propertyUI.y + this.propertyUI.height - 26, this.propertyUI.width - 12, this.propertyUI.height - 80, "blue");
            colorText("Lot Number " + this.propertyUI.tilemapIndex, this.propertyUI.x + 8, this.propertyUI.y + 14, "black", "10px lexendpeta");
            colorText("Sale Price: ", this.propertyUI.x + 18, this.propertyUI.y + 28, "black", "10px lexendpeta");
            colorText(this.propertyUI.salePrice, this.propertyUI.x + 18, this.propertyUI.y + 40, "black", "10px lexendpeta");
            colorText("Zoned: ", this.propertyUI.x + 18, this.propertyUI.y + 52, "black", "10px lexendpeta");
            colorText(this.propertyUI.zoned, this.propertyUI.x + 18, this.propertyUI.y + 64, "black", "10px lexendpeta");
            colorText("Owner:" + this.propertyUI.owner, this.propertyUI.x + 18, this.propertyUI.y + 88, "red", "10px lexendpeta");                    
        }
    };

    this.drawPropertyUI = function(drawing, x, y, width, height, tilemapIndex, salePrice, zoned, ownedBy) { 
        this.propertyUI.drawing = drawing;
        this.propertyUI.x = x;
        this.propertyUI.y = y;
        this.propertyUI.width = width;
        this.propertyUI.height = height;
        this.propertyUI.tilemapIndex = tilemapIndex;
        this.propertyUI.salePrice = salePrice;
        this.propertyUI.zoned = zoned;
		this.propertyUI.owner = ownedBy;
    };
}