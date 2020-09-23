//TO DO LIST
//
const OWNER_NONE = -1;
const OWNER_HUMAN = 0;
const OWNER_CPU_1 = 1;
const OWNER_CPU_2 = 2;
const OWNER_CPU_3 = 3;
const OWNER_CPU_4 = 4;
const HOW_MANY_OWNERS = 5;

//const COLOR_HUMAN = "white"
//const COLOR_CPU_1 = "blue"
//const COLOR_CPU_2 = "green"
//const COLOR_CPU_3 = "purple"
//const COLOR_CPU_4 = "yellow"

const INITIAL_CASH = 20000;
var ownerList = [];

function callPurchaseProperty(){
	for(var i = 1; i < ownerList.length; i++){
		ownerList[i].decidingIfBuyingProperty();
	}
}

function setUpOwners(){
	ownerList = [];
	for(var i = 0; i < HOW_MANY_OWNERS; i++){
		ownerList[i] = new ownerClass();
		ownerList[i].reset(i);
	}
	ownerList[OWNER_HUMAN].teamColor = "#FF4444";
	ownerList[OWNER_CPU_1].teamColor = "CYAN";
	ownerList[OWNER_CPU_2].teamColor = "#77FF77";
	ownerList[OWNER_CPU_3].teamColor = "#FF77FF";
	ownerList[OWNER_CPU_4].teamColor = "yellow";
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
	this.cash = INITIAL_CASH;
	this.teamColor = "black";
	this.myOwnerID = null;
	this.atProperty = null;
	this.propertyOwned = [];
	this.computerWillingessToPurchase = randomIntFromInterval(1,10);
	this.preferenceToEmptyLot = true;
	this.IsOnlyShowingThisOwnersProperties = false;

	this.reset = function(myID){
		this.cash = INITIAL_CASH;
		this.myOwnerID = myID;
		this.atProperty = null;
		var randomPurchasingPreference = randomIntFromInterval(1,2)
		if(randomPurchasingPreference == 1){
			this.preferenceToEmptyLot = true;
		} else {
			this.preferenceToEmptyLot = false;
		}
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

		colorTextShadow(ownerName, textX, textY, this.teamColor);
		textY += textSkipY;
		colorTextShadow("$:" + this.cash, textX, textY, this.teamColor);
		textY += textSkipY;
		colorTextShadow("At: " + (this.atProperty != null ? this.atProperty.building : "no"), textX, textY, this.teamColor);
		textY += textSkipY;
		colorTextShadow("Lots Owned: ", textX, textY, this.teamColor);
		if (mousePosX < textX + 100 && mousePosX > textX &&
			mousePosY < textY && mousePosY > textY -15)
		{
			this.showOwnedProperties();
		}
		else {
			this.IsOnlyShowingThisOwnersProperties = false;
			var isShowingAnyPlayersPropertyOnly = false;
			for (var i = 0; i < ownerList.length; i++) {
				if (ownerList[i].IsOnlyShowingThisOwnersProperties) {
					isShowingAnyPlayersPropertyOnly = true;
				}
			}
			if (!isShowingAnyPlayersPropertyOnly) {
				drawPlayerDesignsOnly = false;
				paused = drawPlayerDesignsOnly;
			}
		}
		for(var i = 0; i < this.propertyOwned.length; i++){
			textY += textSkipY;
			colorTextShadow("Lot " + this.propertyOwned[i], textX, textY, this.teamColor);
		}
	}

	this.showOwnedProperties = function(){
		drawPlayerDesignsOnly = true;
		paused = drawPlayerDesignsOnly;
		whichPlayerDesignsToShow = this.myOwnerID;
		this.IsOnlyShowingThisOwnersProperties = true;
	}

	this.decidingIfBuyingProperty = function(){
		consideringAPurchase = randomIntFromInterval(2,10);

		if(consideringAPurchase >= this.computerWillingessToPurchase){

			var propertyToBuy = null;
			for(var i = 0; i < propertyList.length; i++){
				if(this.preferenceToEmptyLot){
					if(propertyList[i].building == "none"){
						propertyToBuy = propertyList[i];
					}
				} else { // comparing most desiriable property "I" can buy
					if(propertyToBuy == null || propertyList[i].salesScore(this) > propertyToBuy.salesScore(this)){
						propertyToBuy = propertyList[i];
					}
				}
			}

			if(propertyToBuy != null){
				ownerList[this.myOwnerID].buyProperty(propertyToBuy);

			} else {
				console.log(this.myOwnerID + "failed to buy a property and preference to an empty lot is " + this.preferenceToEmptyLot);
			}
		}
	}
}
