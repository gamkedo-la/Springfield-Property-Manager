const USE_HEATMAP = true; // is false, people move randomly
const DEBUG_HEATMAP = true; // if true, spam the console

var heatMaps = {}; // contains arrays the size size as roomGrid[]
// arrays names match values like "Commercial" from buildings.zoned

function heatMapRegenerate(hotness="Commercial",scaledScore=100,tileRange=5) {
    if (DEBUG_HEATMAP) console.log("heatMap.regenerate " + hotness);
    var heat, tile, lot, dist, prop, tx, ty, px, py, score;
    // which map? 
    if (!heatMaps[hotness]) heatMaps[hotness] = []; // create a new one
    heat = heatMaps[hotness];
    // gather heat    
    for (tile=0; tile<roomGrid.length; tile++) {

        heat[tile]=0; // reset
        // heatmap tile x,y
        tx = (tile % MAP_COLS);
        ty = Math.floor((tile-tx) / MAP_ROWS);

        // look at propertyList and burn up the heatmap based on distance!
        for (lot=0; lot<propertyList.length; lot++) {
            prop = propertyList[lot];
            // property heatmap tile x,y
            px = prop.propertyTileMapIndex % MAP_COLS;
            py = Math.floor((prop.propertyTileMapIndex-px) / MAP_ROWS);

            if (prop.zoned==hotness) {
                // found an interesting property!
                dist = Math.sqrt((px-tx)*(px-tx)+(py-ty)*(py-ty));
                if (dist <= tileRange) { // close enough?
                    score = Math.round((1-(dist/tileRange)) * scaledScore);
                    if (DEBUG_HEATMAP) console.log(tx+','+ty+' to '+px+','+py+' dist='+dist.toFixed(1)+' score: '+score);
                    // add more heat based on proximity
                    heat[tile] += score;
                }
            }
        }
    }
    // debug display of entire heatmap
    if (DEBUG_HEATMAP) {
        var debugString = "";
        var htmlString = "Heatmap ["+hotness+"]<br>";
        var red = 0;
        var green = 0;
        var blue = 0;
        var alpha = 1;
        for (tile=0; tile<heat.length; tile++) {
            debugString += heat[tile];
            if (heat[tile] > 250) {
                red = 0; green = Math.min(255,heat[tile]/2);
            } else {
                red = Math.min(255,heat[tile]); green = 0;
            }
            htmlString += "<span style='color:rgba("+red+","+green+","+blue+","+alpha+")'>█</span>"
            if (tile % MAP_COLS == MAP_COLS-1) {
                debugString += "\n";
                htmlString += "<br>";
            }
            else {
                debugString += ",";
            }
            var div = document.getElementById("heatmapDebug");
            if (div) div.innerHTML = htmlString;
        }
        console.log("HEATMAP for "+hotness+":\n"+debugString);
    }
}

function heatMapBestDirection(hotness="Commercial",x,y) {
    //if (DEBUG_HEATMAP) console.log("heatMap.bestDirection looking for " +hotness+' near '+x+','+y);
    
    if (!heatMaps[hotness]) heatMapRegenerate(hotness); // first time?
    var heat = heatMaps[hotness];
    var dir = randomIntFromInterval(1,4); // default
    var index = getTileIndexAtPixelCoord(x,y);
    var bestScore = heatMaps[hotness][index];

    if (index>MAP_COLS && // not on top row
        heat[index-MAP_COLS]>bestScore) {
        bestScore = heat[index-MAP_COLS];
        dir = NORTH;
    }

    if ((index<MAP_ROWS*MAP_COLS-MAP_COLS) && // not on bottom row
        heat[index+MAP_COLS]>bestScore) {
        bestScore = heat[index+MAP_COLS];
        dir = NORTH;
    }
    
    if ((index%MAP_COLS<MAP_COLS-1) && // not on right edge?
        heat[index+1]>bestScore) {
        bestScore = heat[index+1];
        dir = EAST;
    }
    
    if ((index%MAP_COLS>0) && // not on left edge?
        heat[index-1]>bestScore) {
        bestScore = heat[index-1];
        dir = WEST;
    }

    return dir;
}
