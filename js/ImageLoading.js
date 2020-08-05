var propertyPic = document.createElement("img");
var residentialForSaleSignPic = document.createElement("img");
var commercialForSaleSignPic = document.createElement("img");
var buildingPic = document.createElement("img");
var building2Pic = document.createElement("img");
var building3Pic = document.createElement("img");
var restuarantPic = document.createElement("img");
var openningStory1Pic = document.createElement("img");
var openningStory2Pic = document.createElement("img");
var brazilianSteakhousePic = document.createElement("img");
const vehiclesSheet = document.createElement("img");
var human = document.createElement("img");

//var titlepagePic = document.createElement("img");
var trackPics = [];


var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady(){
		picsToLoad--;
		console.log("Images left to load: " +picsToLoad);
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
			{varName: restuarantPic, theFile: "restaurant.png"},
			{varName: buildingPic, theFile: "building.png"},
			{varName: building2Pic, theFile: "regular_duplex.png"},
			{varName: building3Pic, theFile: "building3.png"},
			{varName: brazilianSteakhousePic, theFile: "brazilianSteakHouse.png"},
			{varName: commercialForSaleSignPic, theFile: "commercialForSaleSign.png"},
			{varName: residentialForSaleSignPic, theFile: "residentialForSaleSign.png"},
			{varName: openningStory1Pic, theFile: "openningStory1.png"},
			{varName: openningStory2Pic, theFile: "openningStory2.png"},
			{varName: vehiclesSheet, theFile: "vehicles.png"},
			{varName: human, theFile: "human.png"},

			
			{trackType: TILE_ROAD_NS, theFile: "road_NS.png"},
			{trackType: TILE_ROAD_WE, theFile: "road_WE.png"},
			{trackType: TILE_ROAD_INT, theFile: "road_intersection.png"},
			{trackType: TILE_GRASS, theFile: "grass.png"},
			{trackType: TILE_SNOW, theFile: "snow.png"}
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