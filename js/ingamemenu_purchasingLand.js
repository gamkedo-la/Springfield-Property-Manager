function inGameMenu_PurchasingLand_Definition(){
	this.propertyInformationTextXPos = 20;
	this.propertyInformationTextYPos = 80;
	this.textLineSpacing = 30;
	this.propertyInformation = ["Lot Number: ", "Property Purchase Price: ", "Zoned: ", "Building Type: "]
	
	this.init = function(){
		//console.log("opening info for property information");
	}
	this.exit = function(){
		//console.log("exiting info for property information");
	}
	this.update = function(){
		//console.log("updating info for property information");
	}
	this.draw = function(){
		//Setting up the canvas for sections
		colorRect(0,0,canvas.width,canvas.height, "blue");
		colorRect(10,10,810,30, "white"); //Menu Title
		colorRect(10,50,400,260, "white"); //Property Information Space
		colorRect(10,320,810, 300, "white"); //Space to put future graph
		colorRect(420,50,400,260, "white");  // Property Picture Space
		//Text for Menu Title
		colorText("Land For Sale", 280, 33, "black", font = "26px Arial Black");
		//Property Picture
		drawBitmapAtLocation(building3Pic, 570, 100);
		//Text Data for Property Information
		for(i = 0; i < this.propertyInformation.length; i++){
			colorText(this.propertyInformation[i], this.propertyInformationTextXPos, this.propertyInformationTextYPos + (this.textLineSpacing * [i]), "black", font = "14px Arial Black");
		}		
	}
	this.handleKey = function(keyCode){
		//console.log(keyCode + " handleKey  info for property information");
		changeState(null);
	}
}

var menuState_purchasingLand = new inGameMenu_PurchasingLand_Definition();