var openningStoryTextXPos = 70;
var openningStoryTextYPos = 330;
var openningStoryBoxXPos = 50;
var openningStoryBoxYPos = 330;
var openningStoryBoxHeight = 300;
var openningStoryBoxWidth = 700;

const Menu = new (function () {
  const NEW_CITY = 0;
 // const RESUME_PAGE = 1;
 // const SOUND_PAGE = 2;
  const KEYS_PAGE = 1;
  const CREDITS_PAGE = 2;
  const PAUSED_PAGE = 3;

  let itemsX = 640;//920;
  let topItemY = 320;//770;
  let itemsWidth = 300;
  let rowHeight = 40;
  let colHeight = 60;

  let menuList = [
    "START",
    //"CONTINUE",
   // "SOUND",
    "KEYS",
    "CREDITS",
  ];
  //let optionsList = ["SOUND", "CAPTIONS", "RESOLUTION", "BACK"];
  let keysList = [
    "MOVE CAMERA: ",
    "- Up: W",
    "- Down: S",
    "- Left: A",
    "- Right: D",
    "BUY PROPERTY: SPACE",
    "PAUSE: P",
    "MUTE: M",
    "PROPERTY INFO: I",
    "PURCHASE INFO: L ",
    "TOGGLE HUD: TAB",
    "CLICK TO RETURN",
  ];
  let pausedList = ["SAVE", "LOAD", "BACK"];
  let creditsList = ["BACK"];
  let menuPageText = [
    menuList,
    //0,
    //soundList,
    keysList,
    creditsList,
  ];

  this.cursor = 0;
  let currentPage = 0;

  this.menuMouse = function () {
    if(currentPage !=  0) {
      currentPage = 0;
      return;
    }

    //colorTextShadow(menuPageText[currentPage][i].split('').join(' '), itemsX - 350, topItemY + rowHeight * i, "#09A9A9", "35px Arial");
    for (let i = 0; i < menuPageText[currentPage].length; i++) {
      if (
        mousePosX > itemsX - 350 && mousePosX + itemsWidth &&
        mousePosY + rowHeight / 2 > topItemY + i * rowHeight-17 &&
        mousePosY + rowHeight / 2 < topItemY + (i + 1) * rowHeight-17
      ) {
        // this.setCursorAndCurrentPage(i);
        if(this.cursor == i) {
          this.setCursorAndCurrentPage();
        } else {
            this.cursor = i;
          }
      }
    }
  };

  this.update = function () {

    // the screen can change size
    itemsX = canvas.width/2 - 180;
    topItemY = logo.height/2 + 40;//canvas.height / 2 - 80;

    //this.menuMouse();
    if(currentPage !=  0) {
      return;
    }

    // Position arrow at last option on screen
    if (this.cursor < 0) {
      this.cursor = 0;
    }

    // Position arrow at first option on screen
    if (this.cursor >= menuPageText[currentPage].length) {
      this.cursor = menuPageText[currentPage].length-1;
    }
  };

  // One function to deal with selection by mouse or ENTER/SPACE
  this.setCursorAndCurrentPage = function (cursor = this.cursor) {
    // For now, only allow selection of an option on the main menu page
  /*  if (currentPage !== 0) {
        console.log("Ignoring ENTER/SPACE/CLICK because we are not on the main menu");
      return;
    }*/
    this.checkState();
    this.cursor = cursor;
    // Change page
    currentPage = this.cursor;
    
    console.log("setting current menu page: "+ currentPage);
    
    // Set the cursor at the first option of the new screen
    selectionSFX.play();
  };

  this.checkState = function () {
    // Not using the PAGE consts because they don't match the menuPageText array
    // bugfix: if we change the meu text this breaks
    //if (selectedItemOnPage === "New City") { 
    if (currentPage==0 && this.cursor==0) { 
      const selectedItemOnPage = menuPageText[currentPage][this.cursor];

      console.log("menu checkstate: currentPage:"+currentPage+" cursor:"+this.cursor+" selectedItemOnPage is " + selectedItemOnPage);

        console.log("Player started a new city!");
        document.body.style.background = "url(images/snow-rectangle-tile.png)";
        gameIsStarted = true;
    }

    // if (currentPage!=0  && this.cursor == selectedItemOnPage.length-1) { 
    //   currentPage = 0;
    //   console.log("BACKBACK");
    // }

    //if (currentPage==1 && this.cursor==1) { 
    //  console.log("LOADING");
    //}

    if (currentPage != 0) { // exit keys or credits page
      currentPage = 0;
    }

    this.cursor = 0;
  };

  this.redraw = function () {
    canvasContext.save();
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();
  };

  var menuFrameCount = 0;
  this.draw = function () {
    
    if (gameIsStarted === false) {
      if (currentPage == PAUSED_PAGE) {
        currentPage = 0;
      }
      this.redraw();
      
      //canvasContext.fillStyle = "white";
      //canvasContext.fillRect(0, 0, canvas.width, canvas.height);
      if(currentPage == CREDITS_PAGE) {
        drawCredits();
      } else {
        menuFrameCount++;
        canvasContext.drawImage(badgePic,0,0,badgePic.width,badgePic.height,Math.min(0,-badgePic.width/2+menuFrameCount*2),0,badgePic.width/2,badgePic.height/2);
        canvasContext.drawImage(logo,0,0,logo.width,logo.height,canvas.width/2-logo.width/4,Math.min(0,-logo.height/2+menuFrameCount*2),logo.width/2,logo.height/2);
        if (currentPage == 0) {
          canvasContext.drawImage(
            arrow,
            itemsX,
            topItemY + this.cursor * rowHeight - 30
          );
        }

        for (let i = 0; i < menuPageText[currentPage].length; i++) {
          colorTextShadow(
            menuPageText[currentPage][i].split("").join(" "),
            itemsX + 50,
            topItemY + rowHeight * i,
            "#f7f7f7", //#94216a
            "35px Helvetica"
          );
        }
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

var creditsList = [
" ",
" CLICK ANYWHERE TO GO BACK TO THE MAIN MENU",
" ",
"Vince McKeown: Project lead, core gameplay, property system, main manager AI, time of year, isometric rendering, camera control, additional buildings, art integration, opening story, citizen complaints, seasons, clouds code, landlord events",
"Jeff \"Axphin\" Hanlon: Cloud variations, 3 story building, storm clouds, status bubble, hunger icon, human art variations, sleep status, readability improvements, ground tiles, road alignment correction, mall improvement, updated logo, background texture, 100th game title badge",
"I-wei Chen: Duplex, steakhouse, town house, town center, luxury building, office building, residential duplex, additional art integration, audio code bug fixes, initial draft of help",
"Gabriel Cornish: Unified color palette & retroactive application of it, initial people and car sprites, day counter, sound bug fix, city hall integration, tab sounds, additional vehicle variations",
"Christer \"McFunkypants\" Kaitila: Resolution resizing, camera centering, debug heatmap, input event optimization, scrollbar removal, dynamic month stats graph,  UI selection fix, typo fixing, text shadow feature, thought bubble, zone count tracking, street avoidance, unique naming, park with trees, additional debug displays, birds & butterflies, pets code, rain, assorted bug fixing, flowers",
"Gonzalo Delgado: Case-sensitivity fix, vehicle density increase, car animation support, biker easter egg, vehicle wrap, street light and related integration, drop shadow",
"Randy Tan Shaoxian: HUD hide option, resolved UI sprite order issue, isometric click position, tab key addition, city hall drawer layer, scroll wheel zoom, mouse camera pan, new controls instructions, main menu resize",
"Vaan Hope Khani: Main menu, initial logo draft, navigation sounds, shopping mall, bank, school",
"Chris Markle: CSS styling and font selection, UI tabs panel and related images, highlights fix",
"Barış Köklü: Property buying, character desires, restaurant selling, hunger, building tab improvement, property debug view, hover over functionality",
"H Trayford: Vehicle speed and direction variations, collision avoidance, pets sprites",
"Michelly Oliveira: Pause functionality, defined people data, UI layout adjustment, keys help screen",
"Alan Zaring: Gameplay music",
"Michael \"Misha\" Fewkes: Sound engine, city ambience",
"Bilal A. Cheema: Duplexes, property selection bug fix",
"Charlene A.: Diner and pizza restaurant",
"Kise: Italian restaurant",
"Ryan Gaillard: Display for property ownership",
"Muhammed \"EyeForcz\" Durmusoglu: Debug cheats",
"Chris DeLeon: Small bug fix, compiled credits",
  " ",
  "Game made in HomeTeam GameDev, apply to join us at",
  "HomeTeamGameDev.com"
];

function lineWrapCredits() { // note: gets calling immediately after definition!
  const newCut = [];
  var maxLineChar = 200;
  var findEnd;

  for(let i = 0; i < creditsList.length; i++) {
    const currentLine = creditsList[i];
    for(let j = 0; j < currentLine.length; j++) {
      const aChar = currentLine[j];
      if(aChar === ":") {
        if(i !== 0) {
          //newCut.push("\n");
        }

        newCut.push(currentLine.substring(0, j + 1));
        newCut.push(currentLine.substring(j + 2, currentLine.length));
        break;
      } else if(j === currentLine.length - 1) {
        if((i === 0) || (i >= creditsList.length - 2)) {
          newCut.push(currentLine);
        } else {
          newCut.push(currentLine.substring(1, currentLine.length));
        }
      }
    }
  }

  const newerCut = [];
  for(var i=0;i<newCut.length;i++) {
    while(newCut[i].length > 0) {
      findEnd = maxLineChar;
      if(newCut[i].length > maxLineChar) {
        for(var ii=findEnd;ii>0;ii--) {
          if(newCut[i].charAt(ii) == " ") {
            findEnd=ii;
            break;
          }
        }
      }
      newerCut.push(newCut[i].substring(0, findEnd));
      newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
    }
  }

  creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function

const drawCredits = function() {
  var creditPosY = 10;
  var creditsW = 1280;
  var leftX = 20;//gameCanvas.width/2-creditsW/2;
  var wasFont = canvasContext.font;
  var wasAlign = canvasContext.textAlign;

    for(var i=0; i<creditsList.length; i++) {
      var yPos = creditPosY + i * 12;
      //if (200 < yPos && yPos < 600) {
        if((i > 0) && (creditsList[i].charAt(creditsList[i].length-1) === ":")) {
          canvasContext.font= "13px Arial";
          canvasContext.fillStyle="yellow";
          canvasContext.textAlign="left";
          canvasContext.fillText(creditsList[i],leftX,yPos);
        } else if(i === creditsList.length - 1 || i == 1) {
          canvasContext.font= "15px Arial";
          canvasContext.fillStyle="yellow";
          canvasContext.textAlign="center";
          canvasContext.fillText(creditsList[i],gameCanvas.width/2,yPos+2);
        } else if(i === creditsList.length - 2) {
          canvasContext.font= "10px Arial";
          canvasContext.fillStyle="white";
          canvasContext.textAlign="center";
          canvasContext.fillText(creditsList[i],gameCanvas.width/2,yPos);
        } else {
          canvasContext.font= "10px Arial";
          canvasContext.fillStyle="white";
          canvasContext.textAlign="left";
          canvasContext.fillText(creditsList[i],leftX,yPos);
          creditPosY+=1;
        }
      // }
    }
    canvasContext.font= wasFont;
    canvasContext.textAlign=wasAlign; // cleaning up after itself
  };
