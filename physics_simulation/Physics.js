class Physics {
    constructor() {
        this.objects = [];
    }
    
    update(timeStep) {
        //move
        this.objects.forEach((obj) => {
            obj.velocity.add(obj.acceleration);
            obj.position.add(obj.velocity);
            obj.acceleration.set(0,0);
            
            obj.update();
        });
            
        //handle collisions
        this.objects.forEach((obj) => {
            let vertices_vel = [];
            for(let i = 0; i < obj.vertices.length; i ++) {
                vertices_vel[i] = obj.velocity;
            }
            for(let i = 0; i < obj.vertices.length; i ++) {
                let vel = new Line(obj.vertices_now[i].clone(), obj.vertices_now[i].clone().add(vertices_vel[i]));
                vel.draw();
                this.objects.forEach((other) => {
                    if(other === obj) {return}
                    for(let j = 0; j < other.vertices.length; j ++) {
                        let line = new Line(other.vertices_now[j].clone(), other.vertices_now[(j != other.vertices.length - 1) ? j + 1 : 0].clone());
                        //line.draw();
                        let int1 = line.intersection(vel);
                        let int2 = vel.intersection(line);
                        if(int1 instanceof Vector2 || int2 instanceof Vector2) {
                            let int = (int1 instanceof Vector2) ? int1 : int2
                            console.log(int)
                            ctx.beginPath();
                            ctx.arc(int.x, int.y, 20, 0, 2 * Math.PI);
                            ctx.fill();
                            obj.addForce(obj.velocity.clone().mul(-1));
                        }
                    } 
                });
            }
        });
        
            
        //prepare for next frame
        this.objects.forEach((obj) => {
            if(obj.gravity) {
                obj.addForce(new Vector2(0,1).mul(9.81 / 100 * timeStep * obj.mass));
            }
        });
    }
    
    draw() {
        this.objects.forEach((obj) => {
            obj.draw();
        });
    }
    
}