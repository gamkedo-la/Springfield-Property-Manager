var gameSeconds = 0;
var gameDay = 0; // every 10 seconds equals a day
var gameMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var whichMonth = 0;
var gameYear = 2020;

function updateTime(){


	gameSeconds++;
	if(gameSeconds >= 60){ // every second advances 1 day
		gameSeconds = 0;
        gameDay++;
        if (USE_STATSGRAPH) statsData.days++;
        stepStatsGraph(); // add a data point to all stats
        drawStatsGraph(); // redraw the charts
	}
	
	if(gameDay == 28){
		if(gameMonth[whichMonth] == "February"){
			changeMonth();
		}
	} else if(gameDay == 30){
		if(gameMonth[whichMonth] == "April" || gameMonth[whichMonth] == "June" || gameMonth[whichMonth] == "September" || gameMonth[whichMonth] == "November"){
			changeMonth();
		}
	} else if(gameDay >= 30){
		changeMonth();
	}
}

function displayGameTime(){
	//colorText("X: " + mousePosX + " Y: " + mousePosY, 15, 10, "#fafdff", "14px 'b612regular'");
	colorText(gameMonth[whichMonth] + " " + gameYear, 800,  900, "#ffd100", "30px 'lexendpeta'");
	colorText("Day: " + gameDay, 1000,  900, "#ffd100", "30px 'lexendpeta'");
}

function changeMonth(){
    
    if (USE_STATSGRAPH) statsData.months++;

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
