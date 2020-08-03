var openningStoryTextXPos = 70;
var openningStoryTextYPos = 330;
var openningStoryBoxXPos = 50;
var openningStoryBoxYPos = 330;
var openningStoryBoxHeight = 300;
var openningStoryBoxWidth = 700;

const Menu = new (function() {

const NEW_CITY = 0;
const RESUME = 1;
const OPTIONS = 2;
const KEYS = 3;
const TUTORIALS = 4;
const CREDITS = 5;
const PAUSED = 6;

let itemsX = 540;
let topItemY = 240;
let itemsWidth = 300;
let rowHeight = 40;
let colHeight = 60;

let cursor = 0;

let menuPageText = [menuList, resumeList, optionsList, keysList, tutorialsList, creditsList, pausedList,];

	this.menuMouse = function() {
	for(let i=0; i < menuPageTExt[currentPage].length; i++) {
		if(mouseX > itemsX + (i * colHeight)&& mouseX + itemsWidth + (i+1) * colHeight &&
			mouseY > topItemY + (i * rowHeight) && mouseY < topItemY + (i+1) * rowHeight ) {
			cursor = i;
		}
	}	
	}
})


function drawOpenningStory(){
	//clear Screen
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
	colorText('It’s been a few months since Uncle Marty passed away.  He was a witty old man with a sense of humor.', openningStoryTextXPos, openningStoryTextYPos, "black"); 
}
	
