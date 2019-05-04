const canvas = document.getElementById('canvas-id');
const refitCanvas = () => {
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
}
refitCanvas();
window.addEventListener('resize', refitCanvas);

const ctx = canvas.getContext('2d');
document.body.style.backgroundColor = "black";
ctx.fillStyle = "#FF0000";
ctx.strokeStyle = "#FF0000";
let isKeyPressed = {};

window.addEventListener('keydown', ev => isKeyPressed[ev.code] = true);
window.addEventListener('keyup', ev => isKeyPressed[ev.code] = false);

console.log(setInterval(() => {dragon.rot.y += 0.1}, 1000));

let FOV = 70 / 180 * Math.PI;
let viewPlaneZ =  1 /Math.tan(FOV / 2) * canvas.width / 2;
const camPos = new Vector3(0,-5,-20);
const camRot = new Vector3(0,0,0);
const viewPlane = new Plane(viewPlaneZ);

let obj = new Object3d(new CubeMesh, new Vector3(0,0,0));


function project(point,plane) {
    let line = new Line(camPos,point.clone())
    return LinePlaneIntersection(line,plane);
};

function update() {
    if(isKeyPressed["ArrowUp"]) camPos.z += 0.1;
    if(isKeyPressed["ArrowDown"])  camPos.z -= 0.1;
    if(isKeyPressed["ArrowLeft"]) camPos.x -= 0.1;
    if(isKeyPressed["ArrowRight"]) camPos.x += 0.1;
    if(isKeyPressed["Space"]) camPos.y += 0.1;
    if(isKeyPressed["ShiftLeft"]) camPos.y -= 0.1;
    
    viewPlane.z = camPos.z + viewPlaneZ;
    viewPlaneZ =  1 /Math.tan(FOV / 2) * canvas.width / 2;
//    teapot.rot.x += 0.01;
//    teapot.rot.y += 0.01;
//    teapot.rot.z += 0.01;
    
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    //obj.draw(TRIANGLES);
    //teapot.draw(QUADS);
    dragon.draw(TRIANGLES);
    ctx.restore();
    
    window.requestAnimationFrame(draw);
};

window.requestAnimationFrame(draw);
setInterval(update, 10);