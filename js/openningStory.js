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
	if(openningStoryTimer < (seconds * 5)){
		canvasContext.drawImage(openningStory1Pic, 0, 0);
		colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
		colorText('It’s been a few months since Uncle Marty passed away.', openningStoryTextXPos, openningStoryTextYPos, "black");
		colorText('He was a witty old man with a sense of humor.', openningStoryTextXPos, openningStoryTextYPos + openningStoryLineSpace, "black");
	} else if(openningStoryTimer < (seconds * 10)){
		canvasContext.drawImage(openningStory2Pic, 0, 0);
		colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
		colorText('Nephews and Nieces, I’m glad you were able to make it.', openningStoryTextXPos, openningStoryTextYPos, "black");
		colorText('You will each be given $10,000.', openningStoryTextXPos, openningStoryTextYPos + openningStoryLineSpace, "black");	
	} else if(openningStoryTimer < (seconds * 15)){
		canvasContext.drawImage(openningStory1Pic, 0, 0);
		colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
		colorText('If you look over to the corner, you’ll notice that there is a treasure chest.', openningStoryTextXPos, openningStoryTextYPos, "black");
		colorText('What’s inside?  Only one of you will find out.', openningStoryTextXPos, openningStoryTextYPos + openningStoryLineSpace, "black");	
	} else if(openningStoryTimer < (seconds * 20)){
		canvasContext.drawImage(openningStory1Pic, 0, 0);
		colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
		colorText('With the $10,000, I want you to invest into my town of Springfield.', openningStoryTextXPos, openningStoryTextYPos, "black");
		colorText('The person with the highest Net Worth in 10 years from today will receive the key to the chest,', openningStoryTextXPos, openningStoryTextYPos + openningStoryLineSpace, "black");	
	} else if(openningStoryTimer < (seconds * 25)){
		canvasContext.drawImage(openningStory2Pic, 0, 0);
		colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
		colorText('With the $10,000, I want you to invest into my town of Springfield.', openningStoryTextXPos, openningStoryTextYPos, "black");
		colorText('The person with the highest Net Worth in 10 years from today will receive the key to the chest,', openningStoryTextXPos, openningStoryTextYPos + openningStoryLineSpace, "black");	
	} else if(openningStoryTimer < (seconds * 30)){
		canvasContext.drawImage(openningStory2Pic, 0, 0);
	} else if(openningStoryTimer < (seconds * 32)){
		openningStoryScreen = false;
	}
}

