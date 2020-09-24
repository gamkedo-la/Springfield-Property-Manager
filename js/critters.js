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
    const catPos = Math.round(100 * Math.random()) % 2;
    const numdogs = 1;
    const dogPos = Math.round(100 * Math.random()) % 2;

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
        spdx = 1300;
        spdy = 611;
        distx = 420;
        disty = 224;
        for (i=0; i<numbutterflies; i++) {
            f = Math.round(frame/animspd)%animlen;
            x = Math.round(cx+Math.sin(frame/spdx+i*ofs)*distx);
            y = Math.round(cy+Math.cos(frame/spdy+i*ofs)*disty);
            canvasContext.drawImage(crittersPic,(2+f)*w,0,w,h,x,y,w,h);
        }

        cx = catPos === 0 ? 250 : 10;
        cy = catPos === 0 ? 330 : 210;
        animspd = 25;
        spdx = 950;
        spdy = 944;
        distx = 15;
        disty = 80;
        for (i=0; i<numcats; i++) {
            f = Math.round(frame/animspd)%animlen;
            x = Math.round(cx+Math.sin(frame/spdx+i*ofs)*distx);
            y = Math.round(cy+Math.cos(frame/spdy+i*ofs)*disty);
            canvasContext.drawImage(crittersPic,(4+f)*w,0,w,h,x,y,w,h);
        }
        
        cx = dogPos === 0 ? 320 : 80;
        cy = dogPos === 0 ? 360 : 240;
        animspd = 10;
        spdx = 933;
        spdy = 966;
        distx = -90;
        disty = 20;
        for (i=0; i<numdogs; i++) {
            f = Math.round(frame/animspd)%animlen;
            x = Math.round(cx+Math.sin(frame/spdx+i*ofs)*distx);
            y = Math.round(cy+Math.cos(frame/spdy+i*ofs)*disty);
            canvasContext.drawImage(crittersPic,(6+f)*w,0,w,h,x,y,w,h);
        }        


    }

    // pseudo random - looks random but always the same each run
    function PRNG() {
        this.seed = 777;
        this.next = function() {return(this.gen()/2147483647 );};
        this.nextRange = function(min,max) {return min+((max-min)*this.next());};
        this.gen = function() {return this.seed=(this.seed*16807)%2147483647;};
    };

    this.drawFlowers = function() {
        var x,y;
        if (whichMonth==0||whichMonth==1||whichMonth==11) return // no flowers in winter
        var rando = new PRNG(); // same every time
        for (i=0; i<100; i++) {
            x=Math.round(rando.nextRange(0,450))-100;
            y=Math.round(rando.nextRange(0,250))+225;
            canvasContext.drawImage(crittersPic,(i%8)*w,16,16,16,x,y,16,16);
        }
    }

}();

