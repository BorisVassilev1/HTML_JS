let myX = 400, myY = 300;

class Bullet {
    constructor(pos, dir, speed) {
        this.position = pos;
        this.velocity = dir.normalize().mul(speed);
    }
    update() {
        this.position.add(this.velocity);
    }
    draw() {
        context.fillRect(this.position.x - 5, this.position.y - 5, 10, 10)
    }
}
class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    normalize() {
        this.div(this.length());
        return this;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    mul(a) {
        this.x *= a;
        this.y *= a;
        return this;
    }
    div(a) {
        this.x /= a;
        this.y /= a;
        return this
    }
    add(a) {
        this.x += a.x;
        this.y += a.y;
        return this;
    }
}
function vec(x,y) {
    return new Vector(x,y);
}

let bullets = [];

function update() {
    for(let b of bullets) {
        b.update();
    }
}
function draw() {
    for(let b of  bullets) {
        b.draw();
    }
};
function keyup(key) {
    
};
function mouseup() {
    let pos = vec(myX,myY);
    let vel = vec(mouseX - myX, mouseY - myY);
    console.log(vel);
    bullets.push(new Bullet(pos,vel,5));
};
