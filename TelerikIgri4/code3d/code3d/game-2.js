let geometry = new THREE.PlaneGeometry( 10, 10, 40, 40 );
let frameCount= 0.1

let material = new THREE.MeshPhongMaterial( {wireframe: true, side: THREE.DoubleSide} );

let plane = new THREE.Mesh( geometry, material );


//plane.geometry.vertices[3].x = 3;

scene.add( plane );

var light = new THREE.AmbientLight( );
light.position.set(2,2,3);
scene.add( light );
//scene.add( light2 );

function update() {
    for(let i = 0;i < geometry.vertices.length;i ++) {
        let current = plane.geometry.vertices[i]
        plane.geometry.vertices[i].z = PerlinNoise.noise(current.x,current.y,frameCount / 30)
    }
    geometry.verticesNeedUpdate = true;
	plane.rotation.x += 0.015;
	plane.rotation.y += 0.010;
	plane.rotation.z += 0.005;
    frameCount ++;
}

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}