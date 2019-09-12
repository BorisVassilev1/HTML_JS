class Particle {
    constructor(x,y) {
        this.pos = new Vector2(x,y);
        this.vel = new Vector2(Math.random() * 4 -2 , Math.random() * 4 - 2);
        this.acc = new Vector2(0,0);
        this.mass = Math.random() *  2;
        //this.mass *= this.mass * 10;
        //this.prevPos = new Vector2(0,0);
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,3,0,2 * Math.PI);
        ctx.closePath();
        //ctx.stroke();
        ctx.fillStyle = "rgb(255," + this.mass * 255 + ",255)"
        ctx.fill();
    }
    
    update() {
        this.vel.add(this.acc);
        this.acc.set(0,0);
        //this.prevPos.set(this.pos);
        this.pos.add(this.vel.mul(1.0));
    }
}

let particles = [];
for(let i = 0; i < 1000; i ++) {
    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}


function update() {
    for(let i = 0;  i < particles.length; i ++) {
        for(let j = 0; j < particles.length; j ++) {
            if(i != j) {
                let p1 = particles[i];
                let p2 = particles[j];
                
                let direction = new Vector2(p1.pos.x - p2.pos.x, p1.pos.y - p2.pos.y)
                let distance = direction.length();
                direction.mul(-1 / distance / distance * 0.10 * p1.mass * p2.mass);
                p1.acc.add(direction);
            }
        }
    }
    for(let i = 0; i < particles.length; i ++) {
        particles[i].update();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(const p of particles) {
        p.draw();
    }
    
    window.requestAnimationFrame(draw);
}


window.requestAnimationFrame(draw);
setInterval(update, 10);

