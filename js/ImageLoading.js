var propertyPic = document.createElement("img");
var residentialForSaleSignPic = document.createElement("img");
var commercialForSaleSignPic = document.createElement("img");
var buildingPic = document.createElement("img");
var building2Pic = document.createElement("img");

//var titlepagePic = document.createElement("img");
var trackPics = [];


var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		console.log(picsToLoad);
		if(picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForRoomCode(trackCode, fileName)  {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);	
}

function loadImages() {
	
		var imageList = [
			{varName: propertyPic, theFile: "landMarker.png"},
			{varName: buildingPic, theFile: "building.png"},
			{varName: building2Pic, theFile: "building2.png"},
			{varName: commercialForSaleSignPic, theFile: "commercialForSaleSign.png"},
			{varName: residentialForSaleSignPic, theFile: "residentialForSaleSign.png"},
			
			{trackType: TILE_ROAD_NS, theFile: "road_NS.png"},
			{trackType: TILE_ROAD_WE, theFile: "road_WE.png"},
			{trackType: TILE_ROAD_INT, theFile: "road_intersection.png"},
			{trackType: TILE_GRASS, theFile: "grass.png"}
		];
			
	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) {
		if(imageList[i].trackType != undefined){
			loadImageForRoomCode(imageList[i].trackType, imageList[i].theFile);
		}
		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}