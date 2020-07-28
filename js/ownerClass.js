//TO DO LIST
//
const OWNER_NONE = -1;
const OWNER_HUMAN = 0;
const OWNER_CPU_1 = 1;
const OWNER_CPU_2 = 2;
const OWNER_CPU_3 = 3;
const OWNER_CPU_4 = 4;
const HOW_MANY_OWNERS = 5;

const INITIAL_CASH = 20000;
var ownerList = [];

function setUpOwners(){
	ownerList = [];
	for(var i = 0; i < HOW_MANY_OWNERS; i++){
		ownerList[i] = new ownerClass();
		ownerList[i].reset(i);
	}
}

function ownerClass() {
	this.cash;
	this.myOwnerID;
	this.atProperty;
	this.propertyOwned = [];
	
	this.reset = function(myID){
		this.cash = INITIAL_CASH;
		this.myOwnerID = myID;
		this.atProperty = null;
	}
	
	this.buyProperty = function(propertyToBuy){
		
		if(this.myOwnerID == propertyToBuy.owner){
			console.log("I already own this");
			return;
		}
		
		if(this.cash < propertyToBuy.salePrice){
			console.log(this.myOwnerID + "tried to buy, can't afford.  Sales Price: " + propertyToBuy.salePrice);
			return;
		}
		this.cash -= propertyToBuy.salePrice;
		if(propertyToBuy.owner != OWNER_NONE){
			ownerList[propertyToBuy.owner].cash += propertyToBuy.salePrice;
		}
		propertyToBuy.owner = this.myOwnerID;
		console.log("Purchase to Buy Complete. " + propertyToBuy.zoned + " " + propertyToBuy.building + " " + this.myOwnerID); 
	}
	
	this.checkForPropertiesOwned = function(){
		this.propertyOwned = []; // reset as empty
		for(var i = 0; i < propertyList.length; i++){
			if(this.myOwnerID == propertyList[i].owner){
				newProperty = propertyList[i].propertyTileMapIndex;
				this.propertyOwned.push(newProperty);
			}
		}
	}
	
	this.drawStatus = function(){
		var textX = 140 * (1+this.myOwnerID);
		var textY = 25;
		var textSkipY = 20;
		colorText("Player: " + this.myOwnerID, textX, textY, "yellow");
		textY += textSkipY;
		colorText("$:" + this.cash, textX, textY, "yellow");
		textY += textSkipY;
		colorText("At: " + (this.atProperty != null ? this.atProperty.building : "no"), textX, textY, "yellow");
		textY += textSkipY;
		colorText("Lots Owned: ", textX, textY, "yellow");
		for(var i = 0; i < this.propertyOwned.length; i++){
			textY += textSkipY;
			colorText("Lot " + this.propertyOwned[i], textX, textY, "yellow");
		}
	}
}