var hrug4eX=100, hrug4eY=100, r=100;
var a=2, b= 10;
function update() {

}
function draw() {
    context.translate(100,100);
    for(let x = 0; x < 800; x ++)
    {
        const y = a * x + b;
        context.fillRect(x,y,1,1);
    }
    for(let x = 0; x < 800; x ++)
    {
        for(let y = 0; y < 600; y ++)
        {
            if(x * x + y * y <= r * r) context.fillRect(x,y,1,1);
        }
    }
    let D = - a * a * r * r + b * b - r * r;
    if(-D>=0){
    let x = (- a * b + Math.sqrt(-D)) / (a * a + 1);
    let y = a * x + b;
    context.fillStyle = "red";
    context.fillRect(x-2.5,y-2.5,5,5);
    //console.log(x,y);
    context.fillStyle = "blue";
    }else{console.log("no intersection")}
    context.translate(-100,-100);
};
function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};
function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
