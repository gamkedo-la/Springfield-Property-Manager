function inGameMenu_PropertyInformation_Definition(){
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
		//console.log("draw info for property information");
	}
	this.handleKey = function(keyCode){
		//console.log(keyCode + " handleKey  info for property information");
		changeState(null);
	}
}

var menuState_propertyInformation = new inGameMenu_PropertyInformation_Definition();