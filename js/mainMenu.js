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
let menuList = ["New City", "Options", "Keys", "Tutorials", "Credits"];
let optionsList = ["Sound", "Captions", "Resolution"];
let keysList = [];
let tutorialsList =[];
let pausedList =["Save", "Mute", "Back"];
let creditsList = [];
let menuPageText = [menuList,  optionsList, keysList, tutorialsList, creditsList, pausedList];

	this.menuMouse = function() {
		for(let i=0; i < menuPageTExt[currentPage].length; i++) {
			if(mouseX > itemsX + (i * colHeight)&& mouseX + itemsWidth + (i+1) * colHeight &&
				mouseY > topItemY + (i * rowHeight) && mouseY < topItemY + (i+1) * rowHeight ) {
				cursor = i;
			}
		}	
		}
	
	this .update - function () {
		if (KeyPressed(KEY_SPACEBAR) || keyPressed(KEY_ENTER)){
			this.cheState();
			}
		 else if (keyPressed(KEY_BACKSPACE)) {
			currentPage = MENU_PAGE;
			cursor = 0;
		}
	}

		if(keyPressed(KEY_UP_ARROW)) {
			cursor--;
			//navigationSound.play();
		if(cursor < 0) {
			cursor = menuPageText[currentPage].length - 1;
		}
	}
	
		if(keyPressed(KEY_DOWN_ARROW)) {
			cursor++;
			//navigationSound.play();
		if (cursor >= menuPageText[currentPage].length) {
			cursor = 0;
		}
	}

	this.checkState = function() {
		if (currentPage == GAMEPLAY_PAGE || currentPage == CREDITS_PAGE) {
			currentPage = MENU_PAGE;
			cursor = 0;
			return;
		}

		switch (menuPageText[currentPage][cursor]) {
			case "New City":
				cursor = 0;
				break;
			case "Continue":
				cursor = 0;
				curentPage = OPTIONS_PAGE; 
				break;
			case "Options":
				cursor = 0;
				curentPage = OPTIONS_PAGE; 
				break;
			case "Keys":
				cursor = 0;
				curentPage = KEYS_PAGE; 
				break;
			case "Tutorials":
				cursor = 0;
				curentPage = TUTORIALS_PAGE; 
				break;
			case "Credits":
				cursor = 0;
				curentPage = TUTORIALS_PAGE; 
				break;
			case "Paused":
				curentPage = PAUSED_PAGE; 
				break;
			default:
				break;
		}

		this.redraw = function () {
			canvasContext.save();
			//canvasContext.setTransform(1, 0, 0, 1, 0, 0);
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			canvasContext.restore();
		}

		this.draw = function () {
			if (gameIsStarted === false) {
				if (currentPage == PAUSED_PAGE) {
					currentPage = MENU_PAGE;
				}
				this.redraw();
				//canvasContext.drawImage(logo, 0 ,0);
				//canvasContext.drawImage(arrow, itemsX ,topItemY + (cursor * rowHeight));
			} else {
				currentPage = PAUSED_PAGE;
			}
		}
	}
})


function drawOpenningStory(){
	//clear Screen
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
	colorTextShadow('It’s been a few months since Uncle Marty passed away.  He was a witty old man with a sense of humor.', openningStoryTextXPos, openningStoryTextYPos, "black"); 
}
	
