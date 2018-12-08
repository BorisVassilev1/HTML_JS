// Creating variables

var planeGeometry = new THREE.PlaneGeometry(20,20,100,100);
planeGeometry.dynamic = true;

var material = new THREE.MeshPhongMaterial({wireframe:true,color: 0xFFFF00});
var plane = new THREE.Mesh( planeGeometry   , material );
var frameCount = 0.1;
plane.position.z -=30;
plane.rotation.x = -0.5;
plane.rotation.y = 0.5;
plane.rotation.z = 0.5;
scene.add( plane )

var light = new THREE.AmbientLight( );

scene.add( light );
//scene.add( light2 );
//scene.add( ambient );



function update() {
    for(let i = 0; i < plane.geometry.vertices.length; i ++)
    {
        var current = plane.geometry.vertices[i];
  
        plane.geometry.vertices[i].z = 6 * PerlinNoise.noise(current.x / 5,current.y / 5,frameCount / 3)   
        //plane.geometry.vertices[i].set(current.x,current.y,PerlinNoise.noise(current.x / 5,current.y / 5,frameCount / 3))   
    }
    plane.geometry.verticesNeedUpdate = true;
    frameCount += 0.1;
}
function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
