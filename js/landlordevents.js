var possibleEvents = [
{message: "Bank Error in your favor. Win $1,000.", func: function (){ownerList[OWNER_HUMAN].cash += 1000; }},
{message: "Bank Error in banks favor.  Lose $1,000.", func: function (){ownerList[OWNER_HUMAN].cash -= 1000;}},
{message: "Your building flooded.  Pay for maintenance of $1,000.", func: function (){ownerList[OWNER_HUMAN].cash -= 1000;}},
{message: "Minor fire causing $500 in damage.", func: function (){ownerList[OWNER_HUMAN].cash -= 500;}},
{message: "Won prize for landlord of the month, collect $500", func: function (){ownerList[OWNER_HUMAN].cash += 500;}},
{message: "Found buried treasure on your property worth $2,000", func: function (){ownerList[OWNER_HUMAN].cash += 1000;}},
{message: "Gas leak requiring repairs, lose $1000", func: function (){ownerList[OWNER_HUMAN].cash -= 1000;}},
];
var eventText = "";


function announceLandlordEvent(){
	var whichAnnouncment = Math.floor(Math.random()*possibleEvents.length);
	console.log("Announcement Number: " + whichAnnouncment);
	eventText = possibleEvents[whichAnnouncment].message;
	possibleEvents[whichAnnouncment].func();
}

function drawLandLordEventAnnouncementIfActive(){
	if(announcementIsPosted()){
		drawBitmapAtLocation(eventCardPic, 500, canvas.height - 200);
		colorTextShadow(eventText, 550, canvas.height - 100, "white");
		colorTextShadow("Click Anywhere To Continue", 550, canvas.height-50, "white");
	}
	
}

function announcementIsPosted(){
	return (eventText.length > 0);
}

function eraseAnnouncements(){
	eventText = "";
}