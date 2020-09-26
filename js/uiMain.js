
/* MAIN CONTAINER */
const gameCanvas = document.getElementById('gameCanvas');
const uiContainerMain = document.createElement('div');
document.body.appendChild(uiContainerMain);
uiContainerMain.classList.add('uiContainerMain');

/* CITY LIMIT SIGN CONTAINER */
const citySignContainer = document.createElement('div');
uiContainerMain.appendChild(citySignContainer);
citySignContainer.classList.add('citySignContainer')

// Wood Posts Container
const woodPostsContainer = document.createElement('ul');
uiContainerMain.appendChild(woodPostsContainer);
woodPostsContainer.classList.add('woodPostsContainer');

// Wood Posts
const woodPostLeft = document.createElement('li');
const woodPostRight = document.createElement('li');
woodPostsContainer.appendChild(woodPostLeft);
woodPostsContainer.appendChild(woodPostRight);
woodPostLeft.classList.add('woodPosts');
woodPostRight.classList.add('woodPosts');

// CITY LIMIT SIGN //
const citySign = document.createElement('div');
citySignContainer.appendChild(citySign);
citySign.classList.add('citySign')

// City Name
const cityNameText = document.createElement('h3');
citySign.appendChild(cityNameText);
cityNameText.classList.add('cityNameText')
cityNameText.innerText = 'Springfield';

// City Limit
const cityLimitText = document.createElement('h4');
citySign.appendChild(cityLimitText);
cityLimitText.innerText = 'CITY LIMIT';
cityLimitText.classList.add('cityLimitText');

// POPULATION CONTAINER //
const populationContainer = document.createElement('div');
citySign.appendChild(populationContainer);
populationContainer.classList.add('populationContainer');

// Population Text
const populationText = document.createElement('h5');
populationContainer.appendChild(populationText);
populationText.innerText = 'POP.';
populationText.classList.add('populationText');

// Population Count Container
const populationCountContainer = document.createElement('div');
populationContainer.appendChild(populationCountContainer);
populationCountContainer.classList.add('populationCountContainer');

// Population Count Text
const populationCountText = document.createElement('div')
populationCountContainer.appendChild(populationCountText);
populationCountText.classList.add('populationCountText');   
function updatePopulationGUI() {
  populationCountText.innerHTML = peopleList.length+1;     
}    

/* STATS CONTAINER */
const statsContainerMain = document.createElement('div');
uiContainerMain.appendChild(statsContainerMain);
statsContainerMain.classList.add('statsContainerMain')

// TABS ROW //
const tabsContainer = document.createElement('ul');
statsContainerMain.appendChild(tabsContainer);
tabsContainer.classList.add('tabsContainer');

// Stats Container Inner
const statsContainerInner = document.createElement('div');
statsContainerMain.appendChild(statsContainerInner);
statsContainerInner.classList.add('statsContainerInner');

// Residents Tab/Screen
const residentsTab = document.createElement('li');
const residentsImg = document.createElement('img');
const residentsWindow = document.createElement('div');
tabsContainer.appendChild(residentsTab);
residentsTab.appendChild(residentsImg);
residentsTab.classList.add('residentsTab', 'tabs')
residentsImg.src = 'images/tab_residents.png'; 
residentsWindow.classList.add('windowContainer', 'hidden', 'residents');

// Properties Tab/Screen
const propertiesTab = document.createElement('li');
const propertiesImg = document.createElement('img');
const propertiesWindow = document.createElement('div');
tabsContainer.appendChild(propertiesTab);
propertiesTab.appendChild(propertiesImg);
propertiesTab.classList.add('propertiesTab', 'tabs')
propertiesImg.src = 'images/tab_properties.png'; 
propertiesWindow.classList.add('windowContainer', 'hidden', 'properties');

// Build Tab/Screen
const buildTab = document.createElement('li');
const buildImg = document.createElement('img');
const buildWindow = document.createElement('div');
tabsContainer.appendChild(buildTab);
buildTab.appendChild(buildImg);
buildTab.classList.add('buildTab', 'tabs')
buildImg.src = 'images/tab_build.png'; 
buildWindow.classList.add('windowContainer', 'hidden', 'build');

// Income Tab/Screen
const incomeTab = document.createElement('li');
const incomeImg = document.createElement('img');
const incomeWindow = document.createElement('div');
tabsContainer.appendChild(incomeTab);
incomeTab.appendChild(incomeImg);
incomeTab.classList.add('incomeTab', 'tabs')
incomeImg.src = 'images/tab_income.png';      
incomeWindow.classList.add('windowContainer', 'hidden', 'income');

// Settings Tab/Screen
const settingsTab = document.createElement('li');
const settingsImg = document.createElement('img');
const settingsWindow = document.createElement('div');
tabsContainer.appendChild(settingsTab);
settingsTab.appendChild(settingsImg);
settingsTab.classList.add('settingsTab', 'tabs');
settingsImg.src = 'images/tab_settings.png';
settingsWindow.classList.add('windowContainer', 'hidden', 'settings');

// tooltips
settingsTab.title = "Settings";
incomeTab.title = "Income";
buildTab.title = "Buildings";
propertiesTab.title = "Properties";
residentsTab.title = "Residents";