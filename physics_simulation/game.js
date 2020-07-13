let myX = 0;
let myY = 0;

let cube = new Cube(new Vector2(0, 0), new Vector2(80,80));

let bounding_box = new Cube(new Vector2(0, 0), new Vector2(canvas.width, canvas.height));
bounding_box.gravity = false;
window.addEventListener('resize', () => {bounding_box.setSize(new Vector2(canvas.width, canvas.height));});

let physics = new Physics();
physics.objects.push(cube);
physics.objects.push(bounding_box);

cube.addForce(new Vector3(1,0));

let time = new Time();

function update() {
    
    time.update();
    
   
}

function draw() {
    
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width , canvas.height);
    physics.update(time.deltaTimeS);
    
    physics.draw();
    
    window.requestAnimationFrame(draw);
}



window.requestAnimationFrame(draw);

setInterval(update, 10);
