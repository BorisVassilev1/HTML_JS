let line1 = new Line(new Vector2(100,200), new Vector2(300,200));
//let line2 = new Line(new Vector2(99,200), new Vector2(301,200));
let line2 = new Line(new Vector2(150,50), new Vector2(150,250));

function update() {
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    line1.draw();
    line2.draw();
    let int = line1.intersectionBool(line2);
//    if(int == false) {console.log("dryuiojpk")}
//    console.log(int);
    //ctx.fillRect(int.x - 5, int.y - 5, 10, 10);
    
    
    window.requestAnimationFrame(draw);
}


window.requestAnimationFrame(draw);
setInterval(update, 10);

