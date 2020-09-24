var logo = document.createElement("img");
var arrow = document.createElement("img");
var propertyPic = document.createElement("img");
var residentialForSaleSignPic = document.createElement("img");
var commercialForSaleSignPic = document.createElement("img");
var bankPic = document.createElement("img");
var schoolPic = document.createElement("img");
var mallPic = document.createElement("img");
var dinerPic = document.createElement("img");
var pizzaRestPic = document.createElement("img");
var buildingPic = document.createElement("img");
var building2Pic = document.createElement("img");
var building3Pic = document.createElement("img");
var luxuryResidentialType1 = document.createElement("img");
var luxuryResidentialType2 = document.createElement("img");
var restuarantPic = document.createElement("img");
var luxuryOfficeType1 = document.createElement("img");
var luxuryOfficeType2 = document.createElement("img");
var openningStory1Pic = document.createElement("img");
var openningStory2Pic = document.createElement("img");
var brazilianSteakhousePic = document.createElement("img");
const vehiclesSheet = document.createElement("img");
var humanPic = document.createElement("img");
var human2Pic = document.createElement("img");
var human3Pic = document.createElement("img");
var human4Pic = document.createElement("img");
var human5Pic = document.createElement("img");
var human6Pic = document.createElement("img");
var human7Pic = document.createElement("img");
var textBubblePic = document.createElement("img");
var cloud1Pic = document.createElement("img");
var cloud2Pic = document.createElement("img");
var cloud3Pic = document.createElement("img");
var lightningSpritePic = document.createElement("img");
var playerOnePic = document.createElement("img");
var playerTwoPic = document.createElement("img");
var playerThreePic = document.createElement("img");
var playerFourPic = document.createElement("img");
var soundOnPic = document.createElement("img");
var soundOffPic = document.createElement("img");
var statusBubble = document.createElement("img");
var statusHunger = document.createElement("img");
var statusHomeless = document.createElement("img");
var italianRestaurant = document.createElement("img");
var helpButtonPic = document.createElement("img");
var cityHallPic = document.createElement("img");
var streetLightPic = document.createElement("img");
var eventCardPic = document.createElement("img");
var parkTilePic = document.createElement("img");
var parkWinterTilePic = document.createElement("img");
var crittersPic = document.createElement("img");
var rainEffect = document.createElement("img");

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
			{varName: logo, theFile: "logo.png"},
			{varName: arrow, theFile: "arrow.png"},
			{varName: propertyPic, theFile: "landMarker.png"},
			{varName: restuarantPic, theFile: "restaurant.png"},
			{varName: buildingPic, theFile: "building.png"},
			{varName: building2Pic, theFile: "regular_duplex.png"},
			{varName: building3Pic, theFile: "building3.png"},
			{varName: luxuryResidentialType1, theFile:"building4.png"},
			{varName: luxuryResidentialType2, theFile:"lux_residential_duplex.png"},
			{varName: luxuryOfficeType1, theFile:"luxuryOfficeType1.png"},
			{varName: luxuryOfficeType2, theFile:"luxuryOfficeType2.png"},
			{varName: brazilianSteakhousePic, theFile: "brazilianSteakHouse.png"},
			{varName: commercialForSaleSignPic, theFile: "commercialForSaleSign.png"},
			{varName: residentialForSaleSignPic, theFile: "residentialForSaleSign.png"},
			{varName: openningStory1Pic, theFile: "openningStory1.png"},
			{varName: openningStory2Pic, theFile: "openningStory2.png"},
			{varName: vehiclesSheet, theFile: "vehicles.png"},
            {varName: humanPic, theFile: "human.png"},
			{varName: human2Pic, theFile: "human2.png"},
			{varName: human3Pic, theFile: "human3.png"},
			{varName: human4Pic, theFile: "human4.png"},
			{varName: human5Pic, theFile: "human5.png"},
			{varName: human6Pic, theFile: "human6.png"},
			{varName: human7Pic, theFile: "human7.png"},
			
			
			
			
            {varName: textBubblePic, theFile: "textBubble.png"},
			{varName: cloud1Pic, theFile: "cloud1.png"},
            {varName: cloud2Pic, theFile: "cloud2.png"},
			{varName: cloud3Pic, theFile: "cloudStorm1.png"},
			{varName: lightningSpritePic, theFile: "lightning_SpriteSheet.png"},
			{varName: playerOnePic, theFile: "playerOne.png"},
			{varName: playerTwoPic, theFile: "playerTwo.png"},
			{varName: playerThreePic, theFile: "playerThree.png"},
			{varName: playerFourPic, theFile: "playerFour.png"},
			{varName: soundOnPic, theFile: "sound_on.png"},
			{varName: soundOffPic, theFile: "sound_off.png"},
			{varName: statusBubble, theFile: "statusBubble.png"},
			{varName: statusHunger, theFile: "statusHunger.png"},
			{varName: statusHomeless, theFile: "statusHomeless.png"},
			{varName: italianRestaurant, theFile: "italianRestaurant.png"},
			{varName: helpButtonPic, theFile:"help.png"},
			{varName: streetLightPic, theFile:"streetlight1.png"},	
            {varName: eventCardPic, theFile:"eventCard.png"},
            {varName: parkTilePic, theFile:"park.png"},
            {varName: parkWinterTilePic, theFile:"parkWinter.png"},
            {varName: crittersPic, theFile:"critters.png"},
            {varName: rainEffect, theFile:"rain-effect.png"},
			{varName: bankPic, theFile:"bank.png"},
			{varName: mallPic, theFile:"mall.png"},
			{varName: pizzaRestPic, theFile:"pizzaRestaurant.png"},
			{varName: schoolPic, theFile:"school.png"},
			{varName: dinerPic, theFile:"diner.png"},

			{trackType: TILE_CITY_HALL, theFile:"town_house.png"},
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
