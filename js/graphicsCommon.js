function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}
			
function colorCircle(centerX, centerY, radius, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	canvasContext.fill();
}

function drawBitmapAtLocation(graphic, atX, atY){
	canvasContext.save();
	canvasContext.translate(atX,atY); //sets the point where the car graphic goes
	canvasContext.drawImage(graphic, 0, 0); //center
	canvasContext.restore();
}

function colorText(showWords, textX, textY, fillColor, font = "14px Arial Black") {
  textX = Math.round(textX); // snap to integer coords for clearer text
  textY = Math.round(textY);
  canvasContext.textAlign = "left";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = font;
  canvasContext.fillText(showWords, textX, textY);
}

function colorTextShadow(showWords, textX, textY, fillColor, font = "14px Arial Black") {
    textX = Math.round(textX); // snap to integer coords for clearer text
    textY = Math.round(textY);
    canvasContext.textAlign = "left";
    canvasContext.font = font;
    canvasContext.fillStyle = "black";
    canvasContext.fillText(showWords, textX+1, textY+1);
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}

function textBubble(showWords, textX, textY, fillColor, font = "14px Arial Black") {
    textX = Math.round(textX); // snap to integer coords for clearer text
    textY = Math.round(textY);
    if (window.textBubblePic) { // word bubble exists?
        canvasContext.drawImage(textBubblePic,textX-64,textY-17);
    }
    colorText(showWords, textX, textY, fillColor, font);
}