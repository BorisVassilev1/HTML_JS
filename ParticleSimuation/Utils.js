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