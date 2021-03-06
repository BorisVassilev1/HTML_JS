const canvas = document.getElementById('canvas-id');


const ctx = canvas.getContext('2d');
const refitCanvas = () => {
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
    ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "#FF0000";
    ctx.translate(canvas.width / 2, canvas.height / 2);
}
refitCanvas();
window.addEventListener('resize', refitCanvas);

document.body.style.backgroundColor = "black";
ctx.fillStyle = "#FF0000";
ctx.strokeStyle = "#FF0000";
let isKeyPressed = {};
let mouseX = 0;
let mouseY = 0;

window.addEventListener('keydown', ev => isKeyPressed[ev.code] = true);
window.addEventListener('keyup', ev => isKeyPressed[ev.code] = false);
window.addEventListener('mousemove', ev => {mouseX = ev.x - canvas.width / 2; mouseY = ev.y - canvas.height / 2;});
