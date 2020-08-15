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
		this.checkForStormCloud();
	}
	
	this.checkForStormCloud = function(){
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