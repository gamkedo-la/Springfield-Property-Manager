function SaveLoad() {
    if (typeof Storage === "undefined") {
        console.log('Web Storage is not supported. Progress will not be saved');
        return this;
    }

    this.saveData = function () {
        if (typeof Storage !== "undefined") {
            localStorage.levelRow = MAP_ROWS;
            localStorage.levelCol = MAP_COLS;
            localStorage.propertyTileMapIndex = propertyTileMapIndex;
            player.saveData();
            //localStorage.localHighestLevel = 1;
        } else {
            console.log("update your browser to be able to load/save your game.");
        }
    };

    this.loadData = function () {
        if (typeof Storage !== "undefined") {
            MAP_ROWS = parseInt(localStorage.MAP_ROWS);
            MAP_COLS = parseInt(localStorage.MAP_COLS);
            resetLevel();
            redWarrior.loadData();
        } else {
            console.log("update your browser to be able to load/save your game.");
        }
    }