function setUpClouds(){
	var howManyClouds = randomIntFromInterval(10,30);
	cloudList = [];
	for(var i = 0; i < howManyClouds; i++){
		cloudList[i] = new weatherClass();
		cloudList[i].reset(i);
	}
}

function weatherClass() {
	this.stormCloud = false;

	this.reset = function(){
		this.x = randomIntFromInterval(-600,canvas.width);
		this.y = randomIntFromInterval(0,canvas.height - 400);
		this.vel = Math.random();
		var randomCloudPic = randomIntFromInterval(1,100)
		if(randomCloudPic <= 50){
			this.pic = cloud1Pic;
		} else if (randomCloudPic > 50 && randomCloudPic <=95){
			this.pic = cloud2Pic;
		} else {
			this.stormCloud = true;
			this.pic = cloud3Pic;
		}
	}
	
	this.checkForStormCloud = function(){
		var chanceOfStormCloud = randomIntFromInterval(1,10);
		if(chanceOfStormCloud <= 5){
			this.stormCloud = true;
			this.pic = cloud3Pic;
		} else if (chanceOfStormCloud > 6 && chanceOfStormCloud < 8) {
			this.stormCloud = false;
			this.pic = cloud1Pic;
		} else {
			this.stormCloud = false;
			this.pic = cloud2Pic;
		}
		
	}
	
	this.move = function(){
		this.x = this.vel + this.x;
		
		if(this.x > canvas.width){
			this.x = -600;
			this.checkForStormCloud();
		}
	}
	
	this.draw = function(){
		drawBitmapAtLocation(this.pic, this.x, this.y);
	}
}