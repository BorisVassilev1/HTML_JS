class Line{
    constructor(origin, direction) {
        this.origin = new Vector3(origin.x,origin.y,origin.z);
        this.vector = new Vector3(direction.x, direction.y, direction.z);
    }
}
class Plane {
    constructor(z) { //currently only in z-plane
        this.z = z;
    }
}

function LinePlaneIntersection(line, plane)
{
    let intersectionPoint;
    let t = (plane.z - line.origin.z) / line.vector.z;
    intersectionPoint = line.origin.clone().add(line.vector.clone().mul(t));
    //if(Math.random() < 0.01) console.log(intersectionPoint.z)
    if(t<= 0) return null;
    return intersectionPoint;
}

class Object3d {
    constructor(mesh, pos)
    {
        this.pos = pos;
        this.mesh = mesh;
        this.rot = new Vector3(0,0,0);
    }
    draw(type)
    {
        this.mesh.draw(this.pos,this.rot,type);
    }
}