var pivx = 400;
var pivy = 300;
var x = 400;
var y = 200;
var rot = 0.01;
var newx = 0,newy = 0;
function update() {
    
    x = mouseX;
    y = mouseY;
    
    var relx = x - pivx;
    var rely = y - pivy;
    newx = Math.sin(rot + Math.atan(relx/rely)) * Math.sqrt((relx) * (relx) + (rely) * (rely)) + pivx;
    newy = Math.cos(rot + Math.atan(relx/rely)) * Math.sqrt((relx) * (relx) + (rely) * (rely)) + pivy;
    if(y > pivy)
        {
            newy = pivy - (newy - pivy);
            newx = pivx - (newx - pivx);
        }
    if(isKeyPressed[39])
        {
            rot +=0.01;
            console.log("pressed");
        }
}

function draw() {
    context.fillRect(x,y,4,4);
    context.fillStyle = "red"
    context.fillRect(newx,newy,4,4);
    context.fillStyle = "blue"
    context.fillRect(pivx,pivy,5,5)
}

