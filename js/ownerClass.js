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

function callPurchaseProperty(){
	for(var i = 0; i < ownerList.length; i++){
		ownerList[i].decidingIfBuyingProperty();
	}	
}

function setUpOwners(){
	ownerList = [];
	for(var i = 0; i < HOW_MANY_OWNERS; i++){
		ownerList[i] = new ownerClass();
		ownerList[i].reset(i);
	}
}

function getOwnerName(ownedBy) {
	let owner;

	switch(ownedBy) {
		case -1:
			owner = 'None';
			break;
		case 0:
			owner = 'You';
			break;
		case 1:
			owner = 'Player 1';
			break;
		case 2:
			owner = 'Player 2';
			break;
		case 3:
			owner = 'Player 3';
			break;
		case 4:
			owner = 'Player 4';
			break;
	}

	return owner;
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
		this.propertyOwned = []; 
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

		var ownerName = getOwnerName(this.myOwnerID);

		colorTextShadow(ownerName, textX, textY, "yellow");
		textY += textSkipY;
		colorTextShadow("$:" + this.cash, textX, textY, "yellow");
		textY += textSkipY;
		colorTextShadow("At: " + (this.atProperty != null ? this.atProperty.building : "no"), textX, textY, "yellow");
		textY += textSkipY;
		colorTextShadow("Lots Owned: ", textX, textY, "yellow");
		for(var i = 0; i < this.propertyOwned.length; i++){
			textY += textSkipY;
			colorTextShadow("Lot " + this.propertyOwned[i], textX, textY, "yellow");
		}
	}
	
	this.decidingIfBuyingProperty = function(){
		var propertyToBuy = null;
		for(var i = 0; i < propertyList.length; i++){
			if(propertyToBuy == null || propertyList[i].salesScore(ownerList[this.myOwnerID]) > propertyToBuy.salesScore(ownerList[this.myOwnerID])){
				propertyToBuy = propertyList[i];
			}
		}
		
		if(propertyToBuy != null){
			ownerList[this.myOwnerID].buyProperty(propertyToBuy);
			
		}
	}
}