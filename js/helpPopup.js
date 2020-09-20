/*
Todo: Needs a better way to wrap text, currently there is some wonky and hardcoded math to get the lines displaying right.

*/
function helpMenu()
{
	this.title=["HOW TO PLAY?","BASIC CONTROLS"];

	//Summary needs some help if it does not fit the game
	this.quickSummary=["Challenge Your friends and AI to own as much",
					   "property as possible and avoid going bankrupt",
					   "to win the game!"];

	this.controls=[
		"Move Screen UP",
		"Move Screen DOWN",
		"Move Screen LEFT",
		"Move Screen RIGHT",
		"Pause Game",
		"Purchase",
		"Display Properties Info",
		"Zoom In / Out",
		"Reset Zoom",
		"Toggle HUD",
		"Mute/Unmute",
		"Check Opponents Properties"
	];

	this.keys=["W / Right-Click & Drag Up","S / Right-Click & Drag Down","A / Right-Click & Drag Left","D / Right-Click & Drag Right","P","SPACE","I", "Mouse Scroll Up / Down", "Z","TAB","1","4-5-6-7"];

	this.fontSize=14;
	this.line=1;

    this.x = canvas.width;
	this.y = canvas.height;
	this.show =false;

	this.popupDimX=400;
	this.popupDimY=300;
	this.popupX =canvas.width/2-this.popupDimX/2;
	this.popupY =canvas.height/2-this.popupDimY/2;


	this.draw = function(){
		canvasContext.drawImage(helpButtonPic, canvas.width-64, this.y-64);
		if(this.show)
		{
			this.showHelp();
		}
	}

	this.setShow=function(){
		this.show=!this.show;
	}

	this.hoverCheck = function(){

		return  (mousePosX > canvas.width-64 && mousePosX < canvas.width && mousePosY > this.y-64 && mousePosY < this.y);
	}

	this.showHelp= function()
	{
		colorRect(this.popupX-5,this.popupY-5,this.popupDimX+10,this.popupDimY+10,"#000000");
		colorRect(this.popupX,this.popupY,this.popupDimX,this.popupDimY,"#FFFFFF");

		colorText(this.title[0],this.popupX,this.popupY+this.fontSize,"#000000");

		for(var i=0; i<this.quickSummary.length-1; i++)
		{
			colorText(this.quickSummary[i],this.popupX,this.popupY+this.fontSize*(i+2));
		}


		colorText(this.title[1],this.popupX,this.popupY+(this.fontSize*5),"#000000");


		for(var i=0; i<this.controls.length-1; i++)
		{
			colorText(this.controls[i],this.popupX,this.popupY+(this.fontSize*(i+6)))
		}

		for(var i=0; i<this.keys.length-1; i++)
		{
			colorText(this.keys[i],this.popupX+(12*15),this.popupY+(this.fontSize*(i+6)));
		}


	}
}
