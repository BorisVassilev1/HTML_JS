// Creating variables
//var playergeometry = new THREE.SphereGeometry( 1, 20, 10 );
//var playermaterial = new THREE.MeshPhongMaterial({wireframe: true});
//var player = new THREE.Mesh( playergeometry, playermaterial );
//scene.add( player );


camera.position.set(0,0,40)
class Ball
{
    constructor(m,v,r)
    {
        this.mesh = m
        this.vel = v
        this.acc = new THREE.Vector3(0,-0.0098,0)
        this.r = r
    }
    randomisePos()
    {
        this.mesh.position.x = Math.random() * 10 - 5
        this.mesh.position.y = Math.random() * 10 - 5
        this.mesh.position.z = Math.random() * 10 - 5
    }
    randomiseVel()
    {
        this.vel.x = Math.random() / 10
        this.vel.y = Math.random() / 10
        this.vel.z = Math.random() / 10
    }
    update()
    {
        this.vel.add(this.acc)
        this.mesh.position.add(this.vel)
        //this.vel.multiplyScalar(0.999)
        
        let pos = this.mesh.position
        
        if(pos.y < -7)
        {
            this.vel.y *= -0.9
            this.mesh.position.y = -7
        }
        if(pos.x <= -10)
        {
            this.vel.x *= -0.9
            this.mesh.position.x = -10
        }
        if(pos.x >= 10)
        {
            this.vel.x *= -0.9
            this.mesh.position.x = 10
        }
        if(pos.z <= -10)
        {
            this.vel.z *= -0.9
            this.mesh.position.z = -10
        }
        if(pos.z >= 10)
        {
            this.vel.z *= -0.9
            this.mesh.position.z = 10
        }
        this.detectCollisions();
        //console.log("update")
    }
    collides(ball)
    {
        let dist = this.dist(ball.mesh.position)
        //console.log(this.r + ball.r)
        if(dist < this.r + ball.r)
        {
            //console.log("collision")
            return true
        }
        return false
    }
    dist(vec)
    {
        let pos = this.mesh.position
        let dx = pos.x - vec.x
        let dy = pos.y - vec.y
        let dz = pos.z - vec.z
        return Math.sqrt(dx * dx + dy * dy + dz * dz)
    }
    detectCollisions()
    {
        //console.log(balls.length)
        for(let i = 0; i < balls.length; i ++)
        {
            if(this.collides(balls[i]))
            {
                //console.log("collision")
                let pos = this.mesh.position
                let bpos = balls[i].mesh.position
                let d = new THREE.Vector3(pos.x - bpos.x, pos.y - bpos.y, pos.z - bpos.z)
                d.normalize()
                //console.log(this.vel.copy(this.vel))
                let velsum = copy(this.vel).add(balls[i].vel)
                //velsum.clampLength(1)
                //console.log(velsum.length())
                let ratio = Math.sqrt(velsum.length())
                this.vel.add(copy(d).multiplyScalar(0.005))
                balls[i].vel.add(copy(d).multiplyScalar(-0.005))
            }
        }
    }
}

var balls = []
var ballgeometry = new THREE.SphereGeometry( 1, 20, 10 );
var ballmaterial = new THREE.MeshPhongMaterial({wireframe: false});
for(let i = 0; i < 10 ; i ++)
{
    var geometry = new THREE.Mesh( ballgeometry, ballmaterial );
    balls.push(new Ball(geometry,new THREE.Vector3(0,0,0),1))
    balls[i].randomisePos()
    balls[i].randomiseVel()
    scene.add(balls[i].mesh);
}

var fieldgeometry = new THREE.PlaneGeometry( 20, 20, 1 , 1 );
var fieldmaterial = new THREE.MeshPhongMaterial();
var field = new THREE.Mesh( fieldgeometry, fieldmaterial );
//scene.add( field );

var light = new THREE.PointLight( );
var light2 = new THREE.PointLight( );
light.position.set(10,2,20);
light2.position.set(-2, -2, 3);
scene.add( light );
scene.add( light2 );

function update() {
    for(let i = 0; i < balls.length; i ++)
    {
        balls[i].update()
    }
}

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
    for(let i = 0; i < balls.length; i ++)
    {
        //balls[i].randomiseVel()
        //balls[i].vel.y = 0.3 * Math.random() + 0.3
    }
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}

function copy(a)
{
    return new THREE.Vector3(a.x,a.y,a.z)
}