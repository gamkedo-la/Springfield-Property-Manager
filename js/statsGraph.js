const USE_STATSGRAPH = true;
const DEBUG_STATSGRAPH = true; // if true, spam the console

var statsCanvas, statsContext, statsW, statsH;

var statsData = {
    months:0, // how many values in each array?
    days:0, // total
    totalClicks:0,
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
    // add one more column of data
    statsData.people.push(peopleList.length);
    statsData.vehicles.push(vehicleList.length);
    statsData.properties.push(propertyList.length);
    statsData.owners.push(ownerList.length);
    statsData.clicks.push(statsData.totalClicks); // was reset to 0 each step
}

function drawStatsGraph() { // runs every second
    //if (DEBUG_STATSGRAPH) console.log("drawStatsGraph");
    
    // if first time, grab first month right away
    if (!statsData.initialized) {
        if (DEBUG_STATSGRAPH) console.log("initializing stats graph data");
        stepStatsGraph();
        statsData.initialized = true;
    }
    
    // init once only
    if (!statsCanvas) {
        statsCanvas = document.getElementById("statsCanvas");
        statsContext = statsCanvas.getContext('2d');
        statsW = statsContainerInner.clientWidth;
        statsH = statsContainerInner.clientHeight + 4; // FIXME: extra size due to border?
        statsCanvas.width = statsW;
        statsCanvas.height = statsH;
        statsContainerInner.appendChild(statsCanvas);
    }

    // text debug display
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

    // actually draw a nice line chart!
    statsContext.fillStyle = "#fafdff";
	statsContext.fillRect(0,0,statsW,statsH);
    drawLineGraph(statsData.people,"rgba(148,33,106,0.5)");
    drawLineGraph(statsData.vehicles,"rgba(0,120,153,0.5)");
    drawLineGraph(statsData.properties,"rgba(16,210,117,0.5)");
    drawLineGraph(statsData.owners,"rgba(255,38,116,0.5)");
    drawLineGraph(statsData.clicks,"rgba(22,23,26,1.0)");

}

function maxValue(arr) {
    return arr.reduce(function(a,b) { return Math.max(a,b); });    
}

function drawLineGraph(data,colour) {

    var stepW = statsW / data.length;
    var maxVal = maxValue(data);
    var stepH = statsH / maxVal;

    // force small and infrequently changing stats to be small
    if (maxVal < 20) maxVal = 20;

    //statsContext.beginPath();
    //statsContext.moveTo(0,statsH);
    //statsContext.strokeStyle = colour;
    //statsContext.lineWidth = 5;

    for (var i=0; i<data.length; i++) {
        //statsContext.lineTo(i*stepW, data[i]/maxVal);
        statsContext.fillStyle = colour;
        var x = i*stepW;
        var y = statsH - (statsH * (data[i]/maxVal));
        if (maxVal==0 || y>=statsH) y = statsH-1; // minimum 1 pixel
	    statsContext.fillRect(x,y,stepW,statsH-y);
    }

    //statsContext.stroke();

}