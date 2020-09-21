// CRITTERS.JS by McFunkypants
// birds
// butterflies
// cats
// dogs

// example usage:
// critters.draw();

// a global object named critters is created immedately here
window.critters = new function() {

    const crittercount = 4; // num critters
    const animlen = 2; // num frames per critter
    const ofs = 24; // wobble offset between birds of same type
    const w = 16; // pixel size
    const h = 16;
    const numbirds = 5;
    const numbutterflies = 3;
    const numcats = 1;
    const numdogs = 1;

    var frame = 0;
    var i,f,x,y,cx,cy;
    var animspd, spdx, spdy, distx, disty;

    this.draw = function() {

        if (!window.crittersPic) return; // the horiz spritesheet img
        
        frame++;

        // BIRDS
        cx = 100;
        cy = 200;
        animspd = 8;
        spdx = 450;
        spdy = 75;
        distx = 200;
        disty = 50;
        for (i=0; i<numbirds; i++) {
            f = Math.round(frame/animspd)%animlen; // sprite frame
            x = cx+Math.sin(frame/spdx+i*ofs)*distx;
            y = cy+Math.cos(frame/spdy+i*ofs)*disty;
            canvasContext.drawImage(crittersPic,(0+f)*w,0,w,h,x,y,w,h);
        }
        
        cx = 150;
        cy = 360;
        animspd = 15;
        spdx = 300;
        spdy = 111;
        distx = 420;
        disty = 224;
        for (i=0; i<numbutterflies; i++) {
            f = Math.round(frame/animspd)%animlen;
            x = cx+Math.sin(frame/spdx+i*ofs)*distx;
            y = cy+Math.cos(frame/spdy+i*ofs)*disty;
            canvasContext.drawImage(crittersPic,(2+f)*w,0,w,h,x,y,w,h);
        }

        cx = 250;
        cy = 360;
        animspd = 25;
        spdx = 200;
        spdy = 111;
        distx = 15;
        disty = 100;
        for (i=0; i<numcats; i++) {
            f = Math.round(frame/animspd)%animlen;
            x = cx+Math.sin(frame/spdx+i*ofs)*distx;
            y = cy+Math.cos(frame/spdy+i*ofs)*disty;
            canvasContext.drawImage(crittersPic,(4+f)*w,0,w,h,x,y,w,h);
        }

    }

}();