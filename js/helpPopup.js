function helpMenu()
{
    this.x = canvas.width; 
	this.y = canvas.height;

	this.draw = function(){
		canvasContext.drawImage(helpButtonPic, canvas.width-64, this.y-64);
	}
}