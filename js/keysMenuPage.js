function keysMenuPage() {
  this.redraw = function () {
    canvasContext.save();
    canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();
  };

  this.draw = function () {
    canvasContext.colorRect(0, 0, canvas.width, canvas.height, "black");
  };
}
