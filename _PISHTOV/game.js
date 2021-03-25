let myX = 0;
let myY = 0;

function update() {
    myX += (mouseX - myX) / 30;
    myY += (mouseY - myY) / 30;
}

function draw() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width , canvas.height);
    
    ctx.fillRect(myX,myY, 30, 30);
    
    ctx.fillRect(0, 0, 10, 10);
    
    window.requestAnimationFrame(draw);
}


window.requestAnimationFrame(draw);

setInterval(update, 10);
