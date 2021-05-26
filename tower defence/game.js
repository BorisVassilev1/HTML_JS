
class Bullet {
    constructor(pos, angle, target) {
        
        this.acc = 0.1;
        this.max_speed = 1;
        this.steering_speed = 0.01;
        
        this.pos = pos;
        this.vel = new Vector2(
            Math.cos(angle),
            Math.sin(angle)).mul(this.max_speed);
        this.angle = angle;
        this.size = 4;
        
        
        this.target = target;
    }
    
    update() {
        //this.pos.x += this.speed * Math.cos(this.angle);
        //this.pos.y += this.speed * Math.sin(this.angle);
        
        this.vel.add(new Vector2(
            Math.cos(this.angle),
            Math.sin(this.angle)).mul(this.acc));
        if(this.vel.length() > this.max_speed) {
            this.vel.normalize().mul(this.max_speed);
        }
        
        this.pos.add(this.vel);
        
        
        
        let delta = this.target.clone().sub(this.pos);
        let target_angle = Math.atan2(delta.y, delta.x);
        let difference = target_angle - this.angle;
        
        if(difference > Math.PI) {
            difference = - (2 * Math.PI - difference);
        }
        else if(difference < -Math.PI) {
            difference = (2 * Math.PI + difference);
        }
        
        this.angle += Math.sign(difference) * Math.min(Math.abs(difference), this.steering_speed);
        
        if(this.angle < 0) this.angle += 2 * Math.PI;
        if(this.angle > 2 * Math.PI) this.angle -= 2 * Math.PI;
    }
    
    draw() {
        ctx.fillRect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size);
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + Math.cos(this.angle) * 10,
                  this.pos.y + Math.sin(this.angle) * 10);
        ctx.stroke();
    }
}

class Tower {
    constructor(pos, max_bullets) {
        this.pos = pos;
        this.max_bullets = max_bullets;
        this.bullets = [];
        for(let i = 0; i < max_bullets; i ++) {
            this.bullets[i] = null;
        }
        this.last_free_bullet = 0;
        this.size = 30;
    }
    
    shoot() {
        let bullet = new Bullet(this.pos.clone(), Math.random() * 2 * Math.PI, mouse);
        this.bullets[this.last_free_bullet] = bullet;
        this.last_free_bullet ++;
        this.last_free_bullet %= this.max_bullets;
    }
    
    updateBullets() {
        this.bullets.forEach((a, i) => {
            if(a) {
                a.update();
                if(a.pos.clone().sub(a.target).length() < 20)
                    this.bullets[i] = null;
            }
        });
    }
    
    draw() {
        ctx.fillRect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size);
        this.bullets.forEach(a => {
            if(a) a.draw();
        });
        
    }
}

let tower = new Tower(new Vector2(0,0), 3000)
ctx.strokeStyle = "red";
ctx.lineWidth = 1; 
function update() {
    tower.shoot();
    tower.shoot();
    tower.shoot();
    tower.updateBullets();
}

function draw() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width , canvas.height);
    
    tower.draw();
    
    window.requestAnimationFrame(draw);
}



function keyUp(key) {
    console.log("Key pressed: " + key);
}

function keyDown(key) {
    console.log("Key pressed: " + key);
}

function mouseDown() {
    console.log("Mouse pressed at: " + mouseX + " " + mouseY);
}

function mouseUp() {
    console.log("Mouse released at: " + mouseX + " " + mouseY);
}

window.requestAnimationFrame(draw);

setInterval(update, 10);
