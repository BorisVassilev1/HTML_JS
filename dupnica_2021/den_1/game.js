let mySpeed = 6;
let myX = 0;
let sizeX = 100, sizeY = 100;

let vragX = [], vragY = [];

let broiVragoveX = 10;
let broiVragoveY = 5;

let broiVragove = broiVragoveX * broiVragoveY;

let broiIzminaliUpdeiti = 0;

let vragPosokaX = 1;
let vragPosokaY = 1;
let vragSpeed = 20;
let vragSizeX = 40;
let vragSizeY = 30;

//for(let i = 0; i < broiVragove; i ++) {
//    vragX[i] = (-broiVragoveX / 2 + i % broiVragoveX) * 100;
//    vragY[i] = (-broiVragoveY / 2 + Math.floor(i / broiVragoveX)) * 100;
//}

let bulletX = [];
let bulletY = [];

let bulletSizeX = 10;
let bulletSizeY = 40;
let bulletSpeed = 10;

let bulletsCount = 10;
let freeBullet = 0;

for(let i = 0; i < bulletsCount; i ++) {
    bulletX[i] = -10000;
    bulletY[i] = -10000;
}

for(let y = 0; y < broiVragoveY; y ++) {
    for(let x = 0; x < broiVragoveX; x ++) {
        let index = y * broiVragoveX + x;
        vragX[index] = (-broiVragoveX / 2 + x) * 140;
        vragY[index] = (-broiVragoveY / 2 + y) * 100 - 200;
    }
}


function update() {
    if(isKeyPressed[39]) {
        myX += mySpeed;
    }
    if(isKeyPressed[37]) {
        myX -= mySpeed;
    }
    
    if(myX < -canvas.width / 2) {
        myX = -canvas.width / 2;
    } else if(myX > canvas.width / 2 - sizeX) {
        myX = canvas.width / 2 - sizeX;
    }
    
    if(broiIzminaliUpdeiti % 60 == 0) {
        for(let i = 0; i < broiVragove; i ++) {
            vragX[i] += vragPosokaX * vragSpeed;
            vragY[i] += vragPosokaY * vragSpeed;
        }
        
        let maxX = -10000, minX = 10000;
        for(let i = 0; i < broiVragove; i ++) {
            if(vragX[i] < minX && vragX[i] < canvas.width) {
                minX = vragX[i];
            }
            if(vragX[i] > maxX && vragX[i] < canvas.width) {
                maxX = vragX[i];
            }
        }
        
        if(maxX > canvas.width / 2 - vragSizeX - 60)
            vragPosokaX = -1;
        if(minX < -canvas.width / 2 + 60)
            vragPosokaX = 1;
        if(vragPosokaY == -1) vragPosokaY = 1;
        else if(vragPosokaY == 1) vragPosokaY = -1;
    }
    
    for(let i = 0; i < bulletsCount; i ++) {
        bulletY[i] -= bulletSpeed;
    }
    
    for(let i = 0; i < bulletsCount; i ++) {
        for(let j = 0; j < broiVragove; j ++) {
            if(areColliding(bulletX[i], bulletY[i], bulletSizeX, bulletSizeY, vragX[j], vragY[j], vragSizeX, vragSizeY)) {
                bulletX[i] = -10000;
                bulletY[i] = -10000;
                vragX[j] = 10000;
                vragY[j] = 10000;
            }
        }
    }
    
    broiIzminaliUpdeiti ++;
}

function draw() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width , canvas.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(myX, canvas.height / 2 - sizeY, sizeX, sizeY);
    
    ctx.fillStyle = "red";
    for(let i = 0; i < broiVragove; i ++) {
        ctx.fillRect(vragX[i], vragY[i], vragSizeX, vragSizeY);
    }
    
    ctx.fillStyle = "black";
    for(let i = 0; i < bulletsCount; i ++) {
        ctx.fillRect(bulletX[i], bulletY[i], bulletSizeX, bulletSizeY);
    }
    
    window.requestAnimationFrame(draw);
}


function keyUp(key) {
    //console.log("presed: " + key);
}

function keyDown(key) {
    
}

function mouseDown() {

}

function mouseUp() {
    bulletX[freeBullet] = myX + sizeX / 2 - bulletSizeX / 2;
    bulletY[freeBullet] = canvas.height / 2 - sizeY;
    freeBullet ++;
    freeBullet %= bulletsCount;
}


window.requestAnimationFrame(draw);
setInterval(update, 10);
