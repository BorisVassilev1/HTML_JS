var myX = 0, myY = 0;

function update() {
    myX += (mouseX - myX)/10;
    myY += (mouseY - myY)/10;
}

function draw() {
    context.fillRect(myX,myY,30,30)
}

