const USE_STATSGRAPH = true;
const DEBUG_STATSGRAPH = false; // if true, spam the console AND the GUI in a div: this is very costly and affects FPS
const STATS_GRAPH_WIDTH = 368;//370; // hardcoded because .clientWidth ignored border/padding
const STATS_GRAPH_HEIGHT = 240;//305;

var statsCanvas, statsContext, statsW, statsH;

const TAB_PEOPLE = 0;
const TAB_BUILDINGS = 1;
const TAB_CONSTRUCTION = 2;
const TAB_MONEY = 3;

var currentStatsTab = TAB_PEOPLE;

var statsData = {
    
    // all-time singule number stats
    months:0,
    days:0,
    totalClicks:0,

    // arrays added to daily (once per second)
    people:[],
    vehicles:[],
    properties:[],
    owners:[],
    residential:[],
    commercial:[],
    vacant:[],
    income:[],
    cash:[],
    clicks:[],
}

function statsCountClick() {
    statsData.totalClicks++;
    //statsData.clicks[statsData.clicks.length-1]++; // per time step
}

function stepStatsGraph() {
    //if (DEBUG_STATSGRAPH) console.log("updateStatsGraph");

    // init once only
    if (!statsCanvas) {
        statsCanvas = document.getElementById("statsCanvas");
        statsContext = statsCanvas.getContext('2d');
        // FIXME: this does not account for padding/border
        //statsW = statsContainerInner.clientWidth;
        //statsH = statsContainerInner.clientHeight;
        statsW = STATS_GRAPH_WIDTH;
        statsH = STATS_GRAPH_HEIGHT;
        statsCanvas.width = statsW;
        statsCanvas.height = statsH;
        statsContainerInner.appendChild(statsCanvas);
        console.log("Stats graph is "+statsW+"x"+statsH);
        statsData.initialized = true;
    }

    // add one more column of data
    statsData.people.push(peopleList.length);
    statsData.vehicles.push(vehicleList.length);
    statsData.properties.push(propertyList.length);
    statsData.owners.push(ownerList.length);
    statsData.clicks.push(statsData.totalClicks); // was reset to 0 each step
    statsData.residential.push(0);
    statsData.commercial.push(0);
    statsData.vacant.push(0);
    statsData.income.push(0);
    statsData.cash.push(0);
}

function drawStatsGraph() { // runs every second
    //if (DEBUG_STATSGRAPH) console.log("drawStatsGraph");
    
    if (!statsData.initialized) return;
    
    // text debug display
    if (DEBUG_STATSGRAPH) {
        var statsdiv = document.getElementById("statsGraph");
        statsdiv.innerHTML =
        "STATS GRAPH<br>"+
        "Days:"+statsData.days+"<br>"+
        "Months:"+statsData.months+"<br>"+
        "Clicks:"+statsData.clicks.join(",")+"<br>"+
        "People:"+statsData.people.join(",")+"<br>"+
        "Vehicles:"+statsData.vehicles.join(",")+"<br>"+
        "Properties:"+statsData.properties.join(",")+"<br>"+
        "Owners:"+statsData.owners.join(",");
    }

    // fill clear
    statsContext.fillStyle = "#fafdff";
    statsContext.fillRect(0,0,statsW,statsH);

    // just blank out instead, so CSS background shows through
    //statsContext.clearRect(0,0,statsW,statsH); // transparent

    // actually draw a nice line chart!
    switch (currentStatsTab) {
        case TAB_PEOPLE:
            drawLineGraph(statsData.people,"rgba(148,33,106,1)","population",0);
            drawLineGraph(statsData.vehicles,"rgba(0,120,153,1)","vehicles",1);
            break;
        case TAB_BUILDINGS:
            drawLineGraph(statsData.residential,"rgba(16,210,117,1)","residential",0);
            drawLineGraph(statsData.commercial,"rgba(16,210,117,1)","commercial",1);
            drawLineGraph(statsData.vacant,"rgba(16,210,117,1)","vacant",2);
            break;
        case TAB_CONSTRUCTION:
            drawLineGraph(statsData.properties,"rgba(16,210,117,1)","properties",0);
            drawLineGraph(statsData.owners,"rgba(16,210,117,1)","owners",1);
            break;
        case TAB_MONEY:
            drawLineGraph(statsData.clicks,"rgba(22,23,26,1.0)","clicks",0);
            drawLineGraph(statsData.income,"rgba(16,210,117,1)","income",1);
            drawLineGraph(statsData.cash,"rgba(16,210,117,1)","cash",2);
            break;
    }
}

function maxValue(arr) {
    return arr.reduce(function(a,b) { return Math.max(a,b); });    
}

function drawLineGraph(data=[],colour="red",legend="value",statnum=0) {

    const MAX_COLS = 30; // optimize: don't draw "entire history" it gets too slow

    var startAt = Math.max(0,data.length-MAX_COLS);
    var howMany = Math.min(MAX_COLS,data.length);
    if (howMany<1) return;

    var stepW = Math.ceil(statsW / howMany);
    var maxVal = Math.ceil(maxValue(data)); // FIXME: this should only check howMany from the end
    var stepH = Math.ceil(statsH / maxVal);

    // force small and infrequently changing stats to be small
    if (maxVal < 20) maxVal = 20;

    // draw the legend
    // why does this not display anything?
    // because this is a different canvas!!!
    // colorTextShadow(legend,8,statsH-16-12*statnum,colour,"8px 'lexendpeta'");
    var textX = 8;
    var textY = statsH-12*(statnum+1);    
    statsContext.textAlign = "left";
    statsContext.font = "8px 'lexendpeta'";
    statsContext.fillStyle = colour;
    statsContext.fillText(legend, textX, textY);

    // draw the line
    statsContext.beginPath();
    statsContext.moveTo(0,statsH - (statsH * (data[startAt]/maxVal)));
    statsContext.strokeStyle = colour;
    statsContext.lineWidth = 5;

    for (var i=0; i<howMany; i++) {
        statsContext.fillStyle = colour;
        var x = i*stepW;
        var y = statsH - (statsH * (data[startAt+i]/maxVal));
        if (maxVal==0 || y>=statsH) y = statsH-1; // minimum 1 pixel
        statsContext.lineTo(x,y);
    }

    statsContext.stroke();

}