var openningStoryTextXPos = 70;
var openningStoryTextYPos = 330;
var openningStoryBoxXPos = 50;
var openningStoryBoxYPos = 330;
var openningStoryBoxHeight = 300;
var openningStoryBoxWidth = 700;

const Menu = new (function () {
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

  let menuList = [
    "New City",
    "Continue",
    "Options",
    "Keys",
    "Tutorials",
    "Credits",
  ];
  let optionsList = ["Sound", "Captions", "Resolution"];
  let keysList = [
    "Move Camera: ",
    "- Up: W",
    "- Down: S",
    "- Left: A",
    "- Right: D",
    "Buy Property: SPACE",
    "Pause: P",
    "Mute: M",
    "Property Info: I",
    "Puchase Info: L ",
    "Toggle HUD: TAB",
  ];
  let tutorialsList = [];
  let pausedList = ["Save", "Mute", "Back"];
  let creditsList = [];
  let menuPageText = [
    menuList,
    pausedList,
    optionsList,
    keysList,
    tutorialsList,
    creditsList,
  ];

  this.cursor = 0;
  let currentPage = 0;

  this.menuMouse = function () {
    //colorTextShadow(menuPageText[currentPage][i].split('').join(' '), itemsX - 350, topItemY + rowHeight * i, "#09A9A9", "35px Arial");
    for (let i = 0; i < menuPageText[currentPage].length; i++) {
      if (
        //mousePosX > itemsX - 350 && mousePosX + itemsWidth &&
        mousePosY + rowHeight / 2 > topItemY + i * rowHeight &&
        mousePosY + rowHeight / 2 < topItemY + (i + 1) * rowHeight
      ) {
        this.setCursorAndCurrentPage(i);
      }
    }
  };

  this.update = function () {
    //this.menuMouse();

    // Position arrow at last option on screen
    if (this.cursor < 0) {
      this.cursor = menuPageText[currentPage].length - 1;
    }

    // Position arrow at first option on screen
    if (this.cursor >= menuPageText[currentPage].length) {
      this.cursor = 0;
    }

    // if (keyPressed(KEY_SPACEBAR) || keyPressed(KEY_ENTER)) {
    //   this.checkState();
    // } else if (keyPressed(KEY_BACKSPACE)) {
    //   currentPage = MENU_PAGE;
    //   this.cursor = 0;
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
  };

  // One function to deal with selection by mouse or ENTER/SPACE
  this.setCursorAndCurrentPage = function (cursor = this.cursor) {
    // For now, only allow selection of an option on the main menu page
    if (currentPage !== 0) {
      return;
    }

    this.cursor = cursor;
    // Change page
    currentPage = this.cursor;

    // Set the cursor at the first option of the new screen
    this.checkState();
    selectionSFX.play();
  };

  this.checkState = function () {
    // Not using the PAGE consts because they don't match the menuPageText array
    const selectedItemOnPage = menuPageText[currentPage][this.cursor];

    if (selectedItemOnPage === "New City") {
      gameIsStarted = true;
    }

    this.cursor = 0;

    // if (currentPage == CREDITS_PAGE) {
    //   currentPage = MENU_PAGE;
    //   this.cursor = 0;
    //   return;
    // }

    // switch (menuPageText[currentPage][this.cursor]) {
    //   case "New City":
    //     gameIsStarted = true;
    //     this.cursor = 0;
    //     break;
    //   case "Continue":
    //     //loadGame();
    //     console.log("load game not yet implmented");
    //     this.cursor = 0;
    //     break;
    //   case "Options":
    //     this.cursor = 0;
    //     curentPage = OPTIONS_PAGE;
    //     console.log("Options not yet implmented");
    //     break;
    //   case "Keys":
    //     this.cursor = 0;
    //     curentPage = KEYS_PAGE;
    //     console.log("Keys ot yet implmented");
    //     break;
    //   case "Tutorials":
    //     this.cursor = 0;
    //     curentPage = TUTORIALS_PAGE;
    //     console.log("Tutorials not yet implmented");
    //     break;
    //   case "Credits":
    //     this.cursor = 0;
    //     curentPage = CREDITS_PAGE;
    //     console.log("Credits not yet implmented");
    //     break;
    //   // case "Sound":
    //   //   console.log("sound>>TODO implement volume changer");
    //   //   break;
    //   // case "Paused":
    //   //   paused = true;
    //   //   curentPage = PAUSED_PAGE;
    //   //   console.log("Paused not yet implmented");
    //   //   break;
    //   // case "Back":
    //   //   currentPage = MENU_PAGE;
    //   //   this.cursor = 0;
    //   //   break;
    //   // case "Mute":
    //   //   //toggleMute();
    //   //   console.log("mute not tested");
    //   //   this.cursor = 0;
    //   //   break;
    //   // case "Save":
    //   //   //saveGame();
    //   //   //saveConfirmed = " (done!)";
    //   //   console.log("save not yet implmented");
    //   //   this.cursor = 0;
    //   //   break;
    //   default:
    //     break;
    // }
  };

  this.redraw = function () {
    canvasContext.save();
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();
  };

  this.draw = function () {
    if (gameIsStarted === false) {
      if (currentPage == PAUSED_PAGE) {
        currentPage = MENU_PAGE;
      }
      this.redraw();
      
      canvasContext.fillStyle = "white";
      canvasContext.fillRect(0, 0, canvas.width, canvas.height);
      canvasContext.drawImage(logo, canvas.width / 2 - 230.5, canvas.height / 2 - 118);
      canvasContext.drawImage(
        arrow,
        itemsX,
        topItemY + this.cursor * rowHeight - 30
      );

      for (let i = 0; i < menuPageText[currentPage].length; i++) {
        colorTextShadow(
          menuPageText[currentPage][i].split("").join(" "),
          itemsX + 50,
          topItemY + rowHeight * i,
          "#94216a",
          "35px Arial"
        );
      }
    } else {
      currentPage = PAUSED_PAGE;
    }
  };
})();

function drawOpenningStory() {
  //clear Screen
  colorRect(0, 0, canvas.width, canvas.height, "black");
  colorRect(
    openningStoryBoxXPos,
    openningStoryBoxYPos,
    openningStoryBoxWidth,
    openningStoryBoxHeight,
    "white"
  );
  colorTextShadow(
    "It’s been a few months since Uncle Marty passed away.  He was a witty old man with a sense of humor.",
    openningStoryTextXPos,
    openningStoryTextYPos,
    "black"
  );
}
