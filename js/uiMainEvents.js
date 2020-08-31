const residentsOptions = ['hunger', 'housing'];
const propertiesOptions = ['occupied', 'vacant'];
const buildOptions = ['commercial', 'residential', 'entertainment'];
const incomeOptions = ['expenses', '...'];
const settingsOptions = ['sound', 'exit to main menu'];

const windowResidents = 0;
const windowProperties = 1;
const windowBuild = 2;
const windowIncome = 3;
const windowSettings = 4;

let currentWindow = windowResidents;

function createLayout(arr, tabName, windowName) {
  for(let options of arr) {
    const button = document.createElement('button');
    button.innerText = `${options}`.toLocaleUpperCase();
    button.classList.add('btn', tabName);
    windowName.append(button);
  }
  statsContainerInner.append(windowName);
}

[...document.getElementsByClassName('tabs')].forEach(e => {
  e.addEventListener('click', (e) => {
    tabClicked(e);
  })
});

tabClicked = (e) => {
  const tabs = [...document.getElementsByClassName('tabs')];
  var clickedTabNum = 0;
  // remove old highlights if any
  for(let i = 0; i < tabs.length; i++) {
    let isHighlighted = tabs[i];
    if(isHighlighted.classList.contains('highlight')) {
      isHighlighted.classList.remove('highlight')
    }
    // which tab was just clicked? used by statsGraph.js
    if (e.currentTarget==isHighlighted) {
        if (i == TAB_BUILDINGS ||  drawPlayerDesignsOnly){
          drawPlayerDesignsOnly = !drawPlayerDesignsOnly;
          paused = drawPlayerDesignsOnly;
        }
        changeStatsTab(i);
        // changeWindow(i); 
    }
  }
  // set current highlight
  e.currentTarget.classList.add('highlight');
}



/* UPDATE BUTTONS DEPENDING ON WHICH TAB IS CLICKED

function drawUIWindows() {
  createLayout(residentsOptions, 'residentsTab', residentsWindow);
  createLayout(propertiesOptions, 'propertiesTab', propertiesWindow);
  createLayout(buildOptions, 'buildTab', buildWindow);
  createLayout(incomeOptions, 'incomeTab', incomeWindow);
  createLayout(settingsOptions, 'settingsTab', settingsWindow);
}

switch (currentWindow) {
  case windowResidents:
    console.log(`I'm on ${currentWindow}`);
    residentsWindow.classList.toggle('hidden');
      break;
  case windowProperties:
    console.log(`I'm on ${currentWindow}`);
    propertiesWindow.classList.toggle('hidden');
      break;
  case windowBuild:
    console.log(`I'm on ${currentWindow}`);
    buildWindow.classList.toggle('hidden');
      break;
  case windowIncome:
    console.log(`I'm on ${currentWindow}`);
    incomeWindow.classList.toggle('hidden');
      break;
  case windowSettings:
    console.log(`I'm on ${currentWindow}`);
    settingsWindow.classList.toggle('hidden');
      break;
}

function changeWindow(i) {
  currentWindow = i;
  console.log(`Tab ${currentWindow} was clicked`);

}   

drawUIWindows();
*/
