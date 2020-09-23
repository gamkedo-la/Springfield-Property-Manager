const LIGHTNING_FRAME_W = 25;
const LIGHTNING_FRAME_COUNT = 3;
const LIGHTNING_FREQ_FRAME_MIN = 200;
const LIGHTNING_FREQ_FRAME_RANGE = 100;

const FRAMES_PER_ANIM_STEP = 5;

var isStorming = false;
var isLightingStrikingNow = false;

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
		if(this.timeTillStrike == 0 && isStorming){
			this.animFrame = 0;
			isLightingStrikingNow = true;
		}
		

	}
	
    this.drawRainDrops = function(){
        console.log("makin it rain!");
        if (!this.rainFrames) this.rainFrames = 0; // lazy init
        const numDrops = 3;
        const dropOffset = 0.333;
        const rainSpeed = 0.2;
        const rainDist = 50;
        const rainWobble = 10;
        const rainWobbleSpd = 0.1;
        var rx, ry, i;
        for (i=0; i<numDrops; i++) {
            rx = this.x + Math.sin((numDrops*dropOffset+this.rainFrames)*rainWobbleSpd) * rainWobble;
            // the % is so we only fall down never up: skips half the sin wave
            ry = 15 + this.y + Math.sin(((i*dropOffset+this.rainFrames)*rainSpeed) % (Math.PI/2)) * rainDist; 
            canvasContext.drawImage(rainEffect, rx, ry);
        }

        this.rainFrames++;
    }

    this.draw = function(){

        this.drawRainDrops();

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