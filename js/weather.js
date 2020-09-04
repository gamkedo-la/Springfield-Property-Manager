const LIGHTNING_FRAME_W = 25;
const LIGHTNING_FRAME_COUNT = 3;
const LIGHTNING_FREQ_FRAME_MIN = 200;
const LIGHTNING_FREQ_FRAME_RANGE = 100;

const FRAMES_PER_ANIM_STEP = 5;

var isStorming = true;

function setUpClouds(){
	var howManyClouds = randomIntFromInterval(10,30);
	cloudList = [];
	for(var i = 0; i < howManyClouds; i++){
		cloudList[i] = new weatherClass();
		cloudList[i].reset(i);
	}
}

function weatherClass() {

	this.reset = function(){
		this.x = randomIntFromInterval(-600,canvas.width);
		this.y = randomIntFromInterval(0,canvas.height - 400);
		this.vel = Math.random();
		this.checkForStormCloud();
		this.animFrame = 1;
		this.framesLeftPerAnimStep = FRAMES_PER_ANIM_STEP;
		this.timeTillStrike = LIGHTNING_FREQ_FRAME_MIN + Math.floor(Math.random () * LIGHTNING_FREQ_FRAME_RANGE);
	}
	
	this.checkForStormCloud = function(){
		var randomCloudPic = randomIntFromInterval(1,100)
		if(randomCloudPic <= 50){
			this.pic = cloud1Pic;
		} else { 
			this.pic = cloud2Pic;
		}
	}
	
	this.move = function(){
		this.x = this.vel + this.x;
		
		if(this.x > canvas.width){
			this.x = -600;
			this.checkForStormCloud();
		}
		if(this.timeTillStrike < 0){
			this.framesLeftPerAnimStep--;
			if(this.framesLeftPerAnimStep <= 0){
				this.framesLeftPerAnimStep = FRAMES_PER_ANIM_STEP;
				this.animFrame++;
				if(this.animFrame >= LIGHTNING_FRAME_COUNT){
					this.animFrame = 0;
					this.timeTillStrike = LIGHTNING_FREQ_FRAME_MIN + Math.floor(Math.random () * LIGHTNING_FREQ_FRAME_RANGE);
				} 
			}
		}
		
		this.timeTillStrike--;
		if(this.timeTillStrike == 0){
			this.animFrame = 0;
		}
		

	}
	
	this.draw = function(){
		if(isStorming){
			drawBitmapAtLocation(cloud3Pic, this.x, this.y);
			if(this.timeTillStrike <= 0){
				canvasContext.drawImage(lightningSpritePic,
					this.animFrame * LIGHTNING_FRAME_W,0,LIGHTNING_FRAME_W,lightningSpritePic.height,
					this.x+(cloud3Pic.width/2 - LIGHTNING_FRAME_W/2+3), this.y+cloud3Pic.height-4,
					LIGHTNING_FRAME_W,lightningSpritePic.height
				);
			}
		} else {
			drawBitmapAtLocation(this.pic, this.x, this.y);
		}
		
		
	}
}