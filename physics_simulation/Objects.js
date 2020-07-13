class Object3d {
    constructor(pos) {
        this.mass = 1;
        
        this.position = pos;
        this.velocity = new Vector2(0,0);
        this.acceleration = new Vector2(0,0);
        
        this.rotation = 0;
        this.rotationV = 0;
        this.rotationA = 0;
        
        this.vertices =[];
        this.vertices_now = [];
    }
    
    update() {
        this.vertices_now = [];
        
        for(let i = 0; i < this.vertices.length; i ++) {
            this.vertices_now[i] = this.vertices[i].clone().rotate(this.rotation).add(this.position);
        }
    }
    
    draw() {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        if(this.vertices_now.length) {
            ctx.moveTo(this.vertices_now[0].x, this.vertices_now[0].y);
        }
        for(let i = 1; i < this.vertices_now.length; i ++) {
            ctx.lineTo(this.vertices_now[i].x, this.vertices_now[i].y);
        }
        ctx.closePath();
        ctx.stroke();
        
        for(let i = 0; i < this.vertices_now.length; i ++) {
            ctx.beginPath();
            ctx.arc(this.vertices_now[i].x, this.vertices_now[i].y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.strokeStyle = "yellow";
            //ctx.moveTo(this.vertices_now[i].x, this.vertices_now[i].y);
            //let to = this.vertices_now[i].clone().add(this.velocity.clone().mul(5));
            //ctx.lineTo(to.x, to.y);
            //ctx.stroke();
        }
    }
    
    setPosition(pos) {
        this.position = pos.clone();
    }
    
    setRotation(rad) {
        this.rotation = rad;
    }

    addForce(vec) {
        this.acceleration.add(vec.clone().mul(1/this.mass));
    }
    
    addForceAt(pos, force) {
        
    }
}

class Cube extends Object3d {
    constructor(pos, size) {
        super(pos)
        
        this.size = size;
        this.update_verts();
        
        this.gravity = true;
    }
    
    update_verts() {
        this.vertices = [
            new Vector2(-this.size.x / 2, -this.size.y / 2),
            new Vector2( this.size.x / 2, -this.size.y / 2),
            new Vector2( this.size.x / 2,  this.size.y / 2),
            new Vector2(-this.size.x / 2,  this.size.y / 2)
        ];
    }
    
     setSize(size) {
        this.size = size.clone();
        this.update_verts();
    }
}
