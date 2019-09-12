var pivx = 400;
var pivy = 300;
var x;
var y;
var rot = 0.01;
var newx ,newy ;
//context.fillRect(0,0,32,234);       

function update() {
    //context.fillStyle = "rgba(255, 255, 255, 1.1)";
   
    context.moveTo(x,y);
    x = mouseX;
    y = mouseY;
    context.lineTo(x,y);
    context.stroke();
    context.closePath();    
    
    context.moveTo(newx,newy);
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
    context.lineTo(newx,newy);
    context.stroke();
}

function draw() {
    
    context.fillStyle = "rgba(255, 0, 0, 0.01)";
     context.fillRect(0,0,800,600);
    //context.fillRect(x,y,4,4);
    //context.fillStyle = "red"
    //context.fillRect(newx,newy,4,4);
    //context.fillStyle = "blue"
    //context.fillRect(pivx,pivy,5,5)
}

