var openningStoryTextXPos = 30;
var openningStoryTextYPos = 560;
var openningStoryLineSpace = 18;
var openningStoryBoxXPos = 10;
var openningStoryBoxYPos = 540;
var openningStoryBoxHeight = 50;
var openningStoryBoxWidth = 780;
var openningStoryTimer = 0;

var storyData = [
	{displaySec: 4, img: openningStory1Pic, lines: ['It’s been a few months since Uncle Marty passed away.','He was a witty old man with a sense of humor.']},
	{displaySec: 4, img: openningStory1Pic, lines: ['My cousin’s and I were all invited to the town of Springfield to receive a final message from him.']}, 
	{displaySec: 1, img: openningStory1Pic, lines: []}, 
	{displaySec: 5, img: openningStory2Pic, lines: ['Nephews and Nieces, I’m glad you were able to make it.','You will each be given $10,000.']},
	{displaySec: 5, img: openningStory2Pic, lines: ['If you look over to the corner, you’ll notice that there is a treasure chest.',' What’s inside?  Only one of you will find out.']},
	{displaySec: 5, img: openningStory1Pic, lines: ['With the $10,000, I want you to invest into my town of Springfield.','The person with the highest Net Worth in 10 years from today will receive the key to the chest,']},
	{displaySec: 3, img: openningStory1Pic, lines: ['and all what is inside of it.','Invest wisely!  You are all Property Managers now.']},
	{displaySec: 1, img: openningStory1Pic, lines: []}
]

function advanceStory() {
	var timeIntoStep = openningStoryTimer/framesPerSecond;
	console.log("trying to skip");
	if(openningStoryScreen) {
		for(storyStep = 0; storyStep < storyData.length; storyStep++){
			if(timeIntoStep < storyData[storyStep].displaySec) {
				openningStoryTimer += (storyData[storyStep].displaySec-timeIntoStep)*framesPerSecond;
				console.log("skipping " + storyStep);
				break;
			}
			timeIntoStep -= storyData[storyStep].displaySec;	
		}
	}
}

function drawOpenningStory(){
	colorRect(0, 0, canvas.width, canvas.height, "green");
	openningStoryTimer++;
	var storyLine = []; 
	var storyPic = null;
	var storyStep = 0;
	var timeIntoStep = openningStoryTimer/framesPerSecond;
	var storyLineFound = false;
	for(storyStep = 0; storyStep < storyData.length; storyStep++){
		if(timeIntoStep < storyData[storyStep].displaySec){
			storyLineFound = true;
			break;
		}
		timeIntoStep -= storyData[storyStep].displaySec;	
	}
	if(storyLineFound){
		storyPic = storyData[storyStep].img;
		for(var i = 0; i < storyData[storyStep].lines.length; i++){
			storyLine.push(storyData[storyStep].lines[i]);
		}
	} else {
		openningStoryScreen = false;
	}
	
	var storyOffsetX = canvas.width/2-storyPic.width/2;
	var storyOffsetY = canvas.height/2-storyPic.height/2;
	if(storyPic != null){
		canvasContext.drawImage(storyPic, storyOffsetX, storyOffsetY);
	}
	if(storyLine.length > 0){
		colorRect(storyOffsetX+openningStoryBoxXPos, storyOffsetY+openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
	}
	for(var i=0; i < storyLine.length; i++){
		colorText(storyLine[i], storyOffsetX+openningStoryTextXPos, storyOffsetY+openningStoryTextYPos + i * openningStoryLineSpace, "black");
	}
}

