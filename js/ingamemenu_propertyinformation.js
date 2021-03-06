const PROPERTY_TITLE_FONT = "26px Arial Black"
const PROPERTY_INFO_FONT = "14px Arial Black";

function inGameMenu_PropertyInformation_Definition(){
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
		colorRect(0,0,canvas.width,canvas.height, "green");
		colorRect(10,10,810,30, "white"); //Menu Title
		colorRect(10,50,400,260, "white"); //Property Information Space
		colorRect(10,320,810, 300, "white"); //Space to put future graph
		colorRect(420,50,400,260, "white");  // Property Picture Space
		//Text for Menu Title
		colorText("Property Information", 280, 33, "black", PROPERTY_TITLE_FONT);
		//Property Picture
		drawBitmapAtLocation(buildingPic, 570, 100);
		//Text Data for Property Information
		for(i = 0; i < this.propertyInformation.length; i++){
			colorText(this.propertyInformation[i], this.propertyInformationTextXPos, this.propertyInformationTextYPos + (this.textLineSpacing * [i]), "black", PROPERTY_INFO_FONT);
		}		
	}
	this.handleKey = function(keyCode){
		//console.log(keyCode + " handleKey  info for property information");
		changeState(null);
	}
}

var menuState_propertyInformation = new inGameMenu_PropertyInformation_Definition();