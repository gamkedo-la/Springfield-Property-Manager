const USE_HEATMAP = true; // is false, people move randomly
const DEBUG_HEATMAP = true; // if true, spam the console

var heatMaps = {}; // contains arrays the size size as roomGrid[]
// arrays names match values like "Commercial" from buildings.zoned

function heatMapRegenerate(hotness="Commercial",score=100,range=500) {
    if (DEBUG_HEATMAP) console.log("heatMap.regenerate " + hotness);
    var heat, tile, lot, dist, prop, tx, ty;
    // which map? 
    if (!heatMaps[hotness]) heatMaps[hotness] = [];
    heat = heatMaps[hotness];
    // gather heat    
    for (tile=0; tile<roomGrid.length; tile++) {
        heat[tile]=0;
        tx = (tile % MAP_COLS) * TILE_W;
        ty = Math.floor((tile-tx) / MAP_ROWS) * TILE_H;
        // look at propertyList and burn up the heatmap based on distance!
        for (lot=0; lot<propertyList.length; lot++) {
            prop = propertyList[lot];
            if (prop.zoned==hotness) {
                // found an interesting property!
                dist = Math.sqrt(Math.pow((prop.x-tx),2)+Math.pow((prop.y-ty),2));
                //if (DEBUG_HEATMAP) console.log(tx+','+ty+' to '+prop.x+','+prop.y+' dist='+dist);
                // add more heat based on proximity
                if (dist <= range) heat[tile] += Math.round(score * dist/range);
            }
        }
    }
    // debug display of entire heatmap
    if (DEBUG_HEATMAP) {
        var debugString = "";
        for (tile=0; tile<heat.length; tile++) {
            debugString += heat[tile];
            if (tile % MAP_COLS == MAP_COLS-1) 
                debugString += "\n";
            else
                debugString += ",";
        }
        console.log("HEATMAP for "+hotness+":\n"+debugString);
    }
}

function heatMapBestDirection(hotness="Commercial",x,y) {
    //if (DEBUG_HEATMAP) console.log("heatMap.bestDirection looking for " +hotness+' near '+x+','+y);
    var dir = randomIntFromInterval(1,4); // default
    
    if (!heatMaps[hotness]) heatMapRegenerate(hotness);

    if (heatMaps[hotness]) { // there is a heatmap for this
        // TODO - implement:
        // find tile index from xy
        // compare adjacent tile heat w current
        // return dir of the hottest neighbor
    }
    
    return dir;
}
