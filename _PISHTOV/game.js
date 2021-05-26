let myX = 0;
let myY = 0;

function update() {
    myX += (mouseX - myX) / 30;
    myY += (mouseY - myY) / 30;
}

function draw() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width , canvas.height);
    
    ctx.fillRect(myX,myY, 30, 30);
    
    ctx.fillRect(-5, -5, 5, 5);
    
    window.requestAnimationFrame(draw);
}


function keyUp(key) {
    console.log("Key pressed: " + key);
}

function keyDown(key) {
    console.log("Key pressed: " + key);
}

function mouseDown() {
    console.log("Mouse pressed at: " + mouseX + " " + mouseY);
}

function mouseUp() {
    console.log("Mouse released at: " + mouseX + " " + mouseY);
}

window.requestAnimationFrame(draw);

setInterval(update, 10);
