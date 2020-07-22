var openningStoryTextXPos = 30;
var openningStoryTextYPos = 560;
var openningStoryLineSpace = 18;
var openningStoryBoxXPos = 10;
var openningStoryBoxYPos = 540;
var openningStoryBoxHeight = 50;
var openningStoryBoxWidth = 780;
var openningStoryTimer = 0;
var seconds = 60;


function drawOpenningStory(){
	colorRect(0, 0, 800, 600, "green");
	openningStoryTimer++;
	var storyLine = []; 
	var storyPic = null;
	
	if(openningStoryTimer < (seconds * 5)){
		storyPic = openningStory1Pic;
		storyLine.push('It’s been a few months since Uncle Marty passed away.');
		storyLine.push('He was a witty old man with a sense of humor.');
	} else if(openningStoryTimer < (seconds * 10)){
		storyPic = openningStory2Pic;
		storyLine.push('Nephews and Nieces, I’m glad you were able to make it.');
		storyLine.push('You will each be given $10,000.');
	} else if(openningStoryTimer < (seconds * 15)){
		storyPic = openningStory1Pic;
		storyLine.push('If you look over to the corner, you’ll notice that there is a treasure chest.');
		storyLine.push('What’s inside?  Only one of you will find out.');
	} else if(openningStoryTimer < (seconds * 20)){
		storyPic = openningStory1Pic;
		storyLine.push('With the $10,000, I want you to invest into my town of Springfield.');
		storyLine.push('The person with the highest Net Worth in 10 years from today will receive the key to the chest,');
	} else if(openningStoryTimer < (seconds * 25)){
		storyPic = openningStory2Pic;
		storyLine.push('With the $10,000, I want you to invest into my town of Springfield.');
		storyLine.push('The person with the highest Net Worth in 10 years from today will receive the key to the chest,');
	} else if(openningStoryTimer < (seconds * 30)){
		storyPic = openningStory2Pic;
	} else if(openningStoryTimer < (seconds * 32)){
		openningStoryScreen = false;
	}
	if(storyPic != null){
		canvasContext.drawImage(storyPic, 0, 0);
	}
	if(storyLine.length > 0){
		colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
	}
	for(var i=0; i < storyLine.length; i++){
		colorText(storyLine[i], openningStoryTextXPos, openningStoryTextYPos + i * openningStoryLineSpace, "black");
	}
}

