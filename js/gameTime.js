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
		whichMonth++;
		gameDay = 0;
		if(whichMonth > gameMonth.length){
			whichMonth = 0;
			gameYear++;
		}
	}		
}

function displayGameTime(){
	colorText(gameMonth[whichMonth] + " " + gameYear, 330, 300, "orange", "18px Arial Black");
	if(gameDay < 5){
		if (gameYear > 2020 || whichMonth > 0){
			colorText("Pay the Mortgage!", 310, 330, "red", "18px Arial Black");
		}
	}
	
}