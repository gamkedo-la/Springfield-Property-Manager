var eventText = "";

function announceLandlordEvent(){
	console.log("function reached");
	eventText = "Bank Error in your favor";
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