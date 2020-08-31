var openningStoryTextXPos = 70;
var openningStoryTextYPos = 330;
var openningStoryBoxXPos = 50;
var openningStoryBoxYPos = 330;
var openningStoryBoxHeight = 300;
var openningStoryBoxWidth = 700;

const Menu = new (function() {

const NEW_CITY = 0;
const RESUME_PAGE = 1;
const OPTIONS_PAGE = 2;
const KEYS_PAGE = 3;
const TUTORIALS_PAGE = 4;
const CREDITS_PAGE = 5;
const PAUSED_PAGE = 6;

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
let currentPage = 0;
let mouseX = 0;
let mouseY = 0;

	this.menuMouse = function() {
		for(let i=0; i < menuPageText[currentPage].length; i++) {
			if(mouseX > itemsX + (i * colHeight)&& mouseX + itemsWidth + (i+1) * colHeight &&
				mouseY > topItemY + (i * rowHeight) && mouseY < topItemY + (i+1) * rowHeight ) {
				cursor = i;
			}
		}	
	}
	
	this.update = function () {
		this.menuMouse();
		if (this.cursor < 0){
            this.cursor = menuPageText[currentPage].length - 1;
        }

        if (this.cursor >= menuPageText[currentPage].length){
            this.cursor = 0;
		}
		// if (KeyPressed(KEY_SPACEBAR) || keyPressed(KEY_ENTER)){
		// 	this.cheState();
		// 	}
		//  else if (keyPressed(KEY_BACKSPACE)) {
		// 	currentPage = MENU_PAGE;
		// 	cursor = 0;
		// }
	

		// if(keyPressed(KEY_UP_ARROW)) {
		// 	cursor--;
		// 	//navigationSound.play();
		// 	if(cursor < 0) {
		// 		cursor = menuPageText[currentPage].length - 1;
		// 	}
		// }
	
		// if(keyPressed(KEY_DOWN_ARROW)) {
		// 	cursor++;
		// 	//navigationSound.play();
		// 	if (cursor >= menuPageText[currentPage].length) {
		// 		cursor = 0;
		// 	}
		// }

	}
	this.checkState = function() {
		if (currentPage == GAMEPLAY_PAGE || currentPage == CREDITS_PAGE) {
			currentPage = MENU_PAGE;
			cursor = 0;
			return;
		}

		switch (menuPageText[currentPage][cursor]) {
			case "New City":
				gameIsStarted = true;
				this.cursor = 0;
				break;
			case "Continue":
				loadGame();
				this.cursor = 0;
				curentPage = OPTIONS_PAGE; 
				break;
			case "Options":
				this.cursor = 0;
				curentPage = RESUME_PAGE; 
				break;
			case "Keys":
				this.cursor = 0;
				curentPage = KEYS_PAGE; 
				break;
			case "Tutorials":
				this.cursor = 0;
				curentPage = TUTORIALS_PAGE; 
				break;
			case "Credits":
				this.cursor = 0;
				curentPage = TUTORIALS_PAGE; 
				break;
			case "Sound":
				console.log("TODO implement volume changer");
				break;
			case "Paused":
				paused = true;
				curentPage = PAUSED_PAGE; 
				break;
			case "Back":
				currentPage  = MENU_PAGE;
				this.cursor = 0;
				break;
			case 'Mute':
				toggleMute();
				this.cursor = 0;
			case 'Save':
				//saveGame();
				//saveConfirmed = " (done!)";
				this.cursor = 0;
				break;
			default:
				break;
		}
	}
	this.redraw = function () {
		canvasContext.save();
		canvasContext.setTransform(1, 0, 0, 1, 0, 0);
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		canvasContext.restore();
	}

	this.draw = function () {
		if (gameIsStarted === false) {
			if (currentPage == PAUSED_PAGE) {
				currentPage = MENU_PAGE;
			}
			this.redraw();
			
			canvasContext.drawImage(logo, 0 ,0);
			//canvasContext.drawImage(arrow, itemsX ,topItemY + (cursor * rowHeight));
			for (let i=0; i<menuPageText[currentPage].length; i++) {
				colorTextShadow(menuPageText[currentPage][i], itemsX - 350, topItemY + rowHeight * i, "#09A9A9", "Arial");
			}
		} else {
			currentPage = PAUSED_PAGE;
		}
	}
})

function drawOpenningStory(){
	//clear Screen
	colorRect(0, 0, canvas.width, canvas.height, "black");
	colorRect(openningStoryBoxXPos, openningStoryBoxYPos, openningStoryBoxWidth, openningStoryBoxHeight, "white");
	colorTextShadow('It’s been a few months since Uncle Marty passed away.  He was a witty old man with a sense of humor.', openningStoryTextXPos, openningStoryTextYPos, "black"); 
}
	
