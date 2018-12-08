// Creating variables
var canvas = document.getElementsByTagName("canvas")[0];
var wallGeometry = new THREE.BoxGeometry( 6, 6, 1 );
var material = new THREE.MeshPhongMaterial();
for(let i = 0; i < 200; i ++)
{
    var cube = new THREE.Mesh(wallGeometry, material);
    cube.position.set(Math.random() * 1000 - 500, 3,Math.random() * 1000 - 500)
    if(Math.random() >= 0.5)
        {
            cube.rotation.y = Math.PI / 2;
        }
    scene.add(cube);
}

var planeGeometry = new THREE.PlaneGeometry(100,100,1,1)
var plane = new THREE.Mesh(planeGeometry,material)
scene.add(plane)

var light1 = new THREE.PointLight( );
light1.position.set(-1000,1000,1000);
var light2 = new THREE.PointLight( );
light2.position.set(1000,-1000,-500);
var light3 = new THREE.PointLight( );
light3.position.set(1000,1000,500);
scene.add( light1 );
scene.add( light2 );

camera.lookAt(0,0,0)

plane.rotation.set(-Math.PI / 2,0,0,0)
cube.position.set(0,1,0)

var yaw = 0;
var pitch = 0;

var velocity = new THREE.Vector3(0,0,0)

function update() {
    Movement();
}

function keyup(key) {
    if (key == 27) document.exitPointerLock();
	//console.log("Pressed", key);
}
function mouseup() {
    if (document.pointerLockElement !== canvas){
        canvas.requestPointerLock();
    }
	// Show coordinates of mouse on click
	//console.log("Mouse clicked at", mouseX, mouseY);
}

function mousemove(e)
{
    yaw += e.movementY;
    pitch += e.movementX;
    camera.rotation.set(0,0,0)
    camera.rotateY(- (pitch - canvas.width / 2) / 1000)
    camera.rotateX(- (yaw - canvas.height / 2) / 1000)
}

function Movement()
{
    var camPos = camera.position
    var camRot = new THREE.Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z)
    
    var speed = 0.5;
    
    if(isKeyPressed[87])//w
    {
        camPos.x += Math.cos(-scamRot.y) * speed
        camPos.z += Math.sin(-camRot.y) * speed
    }
    if(isKeyPressed[83])//a
    {
        camPos.x -= Math.cos(-camRot.y) * speed
        camPos.z -= Math.sin(-camRot.y) * speed
    }
    
    if(isKeyPressed[65])//s
    {
        camPos.x += Math.cos(-camRot.y + Math.PI / 2) * speed
        camPos.z += Math.sin(-camRot.y + Math.PI / 2) * speed
    }
    if(isKeyPressed[68])//d
    {
        camPos.x -= Math.cos(-camRot.y + Math.PI / 2) * speed
        camPos.z -= Math.sin(-camRot.y + Math.PI / 2) * speed
    }   
    if(isKeyPressed[32])
    {
        if(camPos.y == 3)
        velocity.y = 0.3    
    }
    camPos.x += velocity.x
    camPos.y += velocity.y
    camPos.z += velocity.z
    if(camPos.y <= 3)
    {
        camPos.y = 3
    }
    velocity.y -= 0.01;
}
