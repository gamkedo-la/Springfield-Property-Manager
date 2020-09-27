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
    var textX = Math.round(canvas.width/2);
    if(textX < PROPERTY_UI_WIDTH) {
    	textX = PROPERTY_UI_WIDTH; // offset for when played in itch iframe to not overlap UI
    }
    colorTextShadow(gameMonth[whichMonth] + " " + gameYear + " - Day: " + gameDay, textX, canvas.height-18, "#ffd100", "24px 'lexendpeta'","center");
}

function changeMonth(){
    
    if (USE_STATSGRAPH) statsData.months++;
    
	isStorming = false;
	var chanceOfThunderStorm = randomIntFromInterval(0,10)
	if(chanceOfThunderStorm < 2){
		isStorming = true;
	}
	
	var chanceToAddAPerson = randomIntFromInterval(0,4)
	if(chanceToAddAPerson == 1){
		addPerson();	
	}
	if(chanceToAddAPerson == 2){
		for(i = 0; i < 2; i++){
			addPerson();
		}	}
	if(chanceToAddAPerson == 3){
		for(i = 0; i < 3; i++){
			addPerson();
		}	
	}
	

	for (var i = 0; i < peopleList.length; i++) {
		peopleList[i].characteristics.isHungry = true;
		if (peopleList[i].characteristics.propertyToGo === null) {
			peopleList[i].characteristics.decideNextThingToBuy();
			console.log("Someone decided next thing to buy for the month");
		}
	}
	
	var chanceOfLandLordEvent = randomIntFromInterval(0,10)
	if(chanceOfLandLordEvent > 8){
		announceLandlordEvent();
	}
	
	callPurchaseProperty();

	whichMonth++;
	gameDay = 0;
    
    // FIXME the >= is a possible bugfix to avoid off-by-one error (no month 12, we use 0-11)
    if(whichMonth >= gameMonth.length){
		whichMonth = 0;
		gameYear++;
    }
    
    // make the empty space in the html background match the ground tiles
    console.log("whichMonth="+whichMonth+" = "+gameMonth[whichMonth]); 
    if(whichMonth==11 || whichMonth==0 || whichMonth==1) {
        document.body.style.background = "url(images/snow-rectangle-tile.png)";
    } else {
        document.body.style.background = "url(images/grass-rectangle-tile.png)";
    }
	

}
