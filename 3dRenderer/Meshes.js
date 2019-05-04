const TRIANGLES = 3;
const QUADS = 4;

class Mesh {
    constructor(vertices, indices){
        this.vertices = [];
        for(let i = 0; i < vertices.length; i++) {
            this.vertices.push(new Vector3(vertices[i].x, vertices[i].y, vertices[i].z));
        }
        this.indices = [];
        for(let i = 0; i < indices.length; i++) {
            this.indices.push(indices[i]);
        }
    }
    draw(pos,rot,type) {
        if(type == TRIANGLES) {
            for(let i = 0; i < this.indices.length; i +=3) {
                //console.log(this.vertices[this.indices[i + 0]])
                let point0 = project(this.vertices[this.indices[i + 0]].clone().rotateX(rot.x).rotateY(rot.y).rotateZ(rot.z).add(pos).sub(camPos).rotateX(-camRot.x).rotateY(-camRot.y).rotateZ(-camRot.z),viewPlane);
                let point1 = project(this.vertices[this.indices[i + 1]].clone().rotateX(rot.x).rotateY(rot.y).rotateZ(rot.z).add(pos).sub(camPos).rotateX(-camRot.x).rotateY(-camRot.y).rotateZ(-camRot.z),viewPlane);
                let point2 = project(this.vertices[this.indices[i + 2]].clone().rotateX(rot.x).rotateY(rot.y).rotateZ(rot.z).add(pos).sub(camPos).rotateX(-camRot.x).rotateY(-camRot.y).rotateZ(-camRot.z),viewPlane);
                if(point0 != null && point1 != null && point2 != null)
                {
                    ctx.globalAlpha = 100 / point0.length();
                    ctx.beginPath();
                    ctx.moveTo(point0.x,point0.y);
                    ctx.lineTo(point1.x,point1.y);
                    ctx.lineTo(point2.x,point2.y);
                    ctx.closePath();
                    ctx.stroke();
                }  
            }
        }
        else if(type == QUADS) {
            for(let i = 0; i < this.indices.length; i +=4) {
                //console.log(this.vertices[this.indices[i].z]);
                let point0 = project(this.vertices[this.indices[i + 0]].clone().rotateX(rot.x).rotateY(rot.y).rotateZ(rot.z).add(pos).sub(camPos).rotateX(-camRot.x).rotateY(-camRot.y).rotateZ(-camRot.z),viewPlane);
                let point1 = project(this.vertices[this.indices[i + 1]].clone().rotateX(rot.x).rotateY(rot.y).rotateZ(rot.z).add(pos).sub(camPos).rotateX(-camRot.x).rotateY(-camRot.y).rotateZ(-camRot.z),viewPlane);
                let point2 = project(this.vertices[this.indices[i + 2]].clone().rotateX(rot.x).rotateY(rot.y).rotateZ(rot.z).add(pos).sub(camPos).rotateX(-camRot.x).rotateY(-camRot.y).rotateZ(-camRot.z),viewPlane);
                let point3 = project(this.vertices[this.indices[i + 3]].clone().rotateX(rot.x).rotateY(rot.y).rotateZ(rot.z).add(pos).sub(camPos).rotateX(-camRot.x).rotateY(-camRot.y).rotateZ(-camRot.z),viewPlane);
                if(point0 != null && point1 != null && point2 != null && point3 != null)
                {
                    ctx.globalAlpha = 100 / point0.length();
                    ctx.beginPath();
                    ctx.moveTo(point0.x,-point0.y);
                    ctx.lineTo(point1.x,-point1.y);
                    ctx.lineTo(point2.x,-point2.y);
                    ctx.lineTo(point3.x,-point3.y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }
}

class CubeMesh extends Mesh{
    constructor() {
        super([
                new Vector3(-1,-1,-1),
				new Vector3(-1,-1, 1),
				new Vector3(-1, 1,-1),
				new Vector3(-1, 1, 1),
				new Vector3( 1,-1,-1),
				new Vector3( 1,-1, 1),
				new Vector3( 1, 1,-1),
				new Vector3( 1, 1, 1)
            ],[
				0,1,2,
				1,2,3,
				4,5,6,
				5,6,7,
				0,4,5,
				0,1,5,
				1,3,7,
				1,7,5,
				2,4,0,
				2,4,6,
				3,7,6,
				3,2,6
            ]);
    }
}