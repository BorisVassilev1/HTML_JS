class Particle {
    constructor(x,y) {
        this.pos = new Vector2(x,y);
        this.vel = new Vector2(0,0);
        this.acc = new Vector2(0,0);
        this.mass = 1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,1,0,2 * Math.PI);
        ctx.closePath();
        ctx.stroke()
    }
    
    update() {
        this.vel.add(this.acc);
        this.acc.set(0,0);
        this.pos.add(this.vel);
    }
}

let particles = [];
for(let i = 0; i < 2000; i ++) {
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
                direction.mul(-1 / distance / distance * 1);
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

