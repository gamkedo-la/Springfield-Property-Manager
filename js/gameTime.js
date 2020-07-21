var gameSeconds = 0;
var gameDay = 0; // every 10 seconds equals a day
var gameMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var whichMonth = 0;
var gameYear = 2020;

function updateTime(){
	gameSeconds++;
	if(gameSeconds == 60){ // every second advances 1 day
		gameSeconds = 0;
		gameDay++
	}
	if(gameDay == 30){
		ChangeMonth();
	}
}

function displayGameTime(){
	colorText("X: " + mousePosX + " Y: " + mousePosY, 15, 10, "white", "14px 'b612regular'");
	colorText(gameMonth[whichMonth] + " " + gameYear, 330, 300, "orange", "30px 'lexendpeta'");
	if(gameDay < 5){
		if (gameYear > 2020 || whichMonth > 0){
			colorText("Bills are due!", 310, 330, "red", "25px 'lexendpeta'");
		}
	}

}

function ChangeMonth(){
	for (var i = 0; i < peopleList.length; i++) {
		peopleList[i].characteristics.isHungry = true;
		if (peopleList[i].characteristics.propertyToGo === null) {
			peopleList[i].characteristics.decideNextThingToBuy();
			console.log("Someone decided next thing to buy for the month");
		}
	}

	whichMonth++;
	gameDay = 0;
	if(whichMonth > gameMonth.length){
		whichMonth = 0;
		gameYear++;
	}
}
