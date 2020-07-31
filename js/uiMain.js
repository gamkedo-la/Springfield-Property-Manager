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
const populationCountText = document.createElement('p')
populationCountContainer.appendChild(populationCountText);
populationCountText.classList.add('populationCountText');
populationCountText.innerText = '12';                     // UPDATE DYNAMICALLY
		// draw population total
		// var population = peopleList.length;
		// colorText(`TOTAL POPULATION: ${population}`, 0, canvas.height-50, 'white', font = "14px 'lexendpeta'") 

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
tabsContainer.appendChild(residentsTab);
residentsTab.classList.add('residentsTab', 'tabs')
residentsTab.innerText = 'Residents';                   // TEMP

// Properties Tab/Screen
const propertiesTab = document.createElement('li');
tabsContainer.appendChild(propertiesTab);
propertiesTab.classList.add('propertiesTab', 'tabs')
propertiesTab.innerText = 'Properties';                 // TEMP

// Build Tab/Screen
const buildTab = document.createElement('li');
tabsContainer.appendChild(buildTab);
buildTab.classList.add('buildTab', 'tabs')
buildTab.innerText = 'Build';                          // TEMP

// Income Tab/Screen
const incomeTab = document.createElement('li');
tabsContainer.appendChild(incomeTab);
incomeTab.classList.add('incomeTab', 'tabs')
incomeTab.innerText = 'Income';                        // TEMP

// Settings Tab/Screen
const settingsTab = document.createElement('li');
tabsContainer.appendChild(settingsTab);
settingsTab.classList.add('settingsTab', 'tabs');
settingsTab.innerText = 'Settings';                    // TEMP

