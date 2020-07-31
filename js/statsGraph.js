const USE_STATSGRAPH = true;
const DEBUG_STATSGRAPH = true; // if true, spam the console

var statsData = {
    months:0, // how many values in each array?
    days:0, // total
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
    statsData.clicks[statsData.clicks.length-1]++;
}

function updateStatsGraphMonthly() { // runs once per month
    if (DEBUG_STATSGRAPH) console.log("updateStatsGraph");
    statsData.months++;
    // add one more month worth of data
    statsData.people.push(peopleList.length);
    statsData.vehicles.push(vehicleList.length);
    statsData.properties.push(propertyList.length);
    statsData.owners.push(ownerList.length);
    statsData.clicks.push(0);
}

function drawStatsGraph() { // runs every second
    //if (DEBUG_STATSGRAPH) console.log("drawStatsGraph");
    
    // if first time, grab first month right away
    if (!statsData.initialized) {
        if (DEBUG_STATSGRAPH) console.log("initializing stats graph data");
        updateStatsGraphMonthly();
        statsData.initialized = true;
    }
    
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
