var possibleEvents = [
{message: "Bank Error in your favor, win $1,000.", func: function (){ownerList[OWNER_HUMAN].cash += 1000; }},
{message: "Bank Error in banks favor, lose $1,000.", func: function (){ownerList[OWNER_HUMAN].cash -= 1000;}},
{message: "Your building flooded, pay for maintenance of $1,000.", func: function (){ownerList[OWNER_HUMAN].cash -= 1000;}},
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
		colorRect(100, 100, canvas.width - 200, 200, "#777");
		colorTextShadow(eventText, 200, 200, "white");
		colorTextShadow("Click Anywhere To Continue", 200, 230, "white");
	}
	
}

function announcementIsPosted(){
	return (eventText.length > 0);
}

function eraseAnnouncements(){
	eventText = "";
}