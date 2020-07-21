var openningStoryTextXPos = 70;
var openningStoryTextYPos = 330;
var openningStoryBoxXPos = 50;
var openningStoryBoxYPos = 330;
var openningStoryBoxHeight = 300;
var openningStoryBoxWidth = 700;

function drawOpenningStory(){
	//clear Screen
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
	colorText('It’s been a few months since Uncle Marty passed away.  He was a witty old man with a sense of humor.', openningStoryTextXPos, openningStoryTextYPos, "black"); 
}
	
