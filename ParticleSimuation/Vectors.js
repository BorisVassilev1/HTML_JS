class Vector2 {
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
    
    add(a){
        this.x += a.x;
        this.y += a.y;
        return this;
    }
    
    sub(a) {
        this.x -= a.x;
        this.y -= a.y;
        return this;
    }
    clone() {
        return new Vector2(this.x,this.y);
    }
    mul(a) {
        this.x *= a;
        this.y *= a;
        return this;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        let len = this.length();
        this.x /= len;
        this.y /= len;
        return this;
    }
    set(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Vector3 {
    constructor(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this;
    }
    sub(a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this;
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    mul(a) {
        this.x *= a;
        this.y *= a;
        this.z *= a;
        return this;
    }
    normalize() {
        let len = this.length();
        this.x /= len;
        this.y /= len;
        this.z /= len;
        return this;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    
    rotateX(rad) {
        let newz = Math.sin(rad + Math.atan2(this.z,this.y)) * Math.sqrt((this.z) * (this.z) + (this.y) * (this.y));
        let newy = Math.cos(rad + Math.atan2(this.z,this.y)) * Math.sqrt((this.z) * (this.z) + (this.y) * (this.y));
        this.z = newz;
        this.y = newy;
        return this;
    }
    
    rotateY(rad) {
        let newx = Math.sin(rad + Math.atan2(this.x,this.z)) * Math.sqrt((this.x) * (this.x) + (this.z) * (this.z));
        let newz = Math.cos(rad + Math.atan2(this.x,this.z)) * Math.sqrt((this.x) * (this.x) + (this.z) * (this.z));
        this.x = newx;
        this.z = newz;
        return this;
    }
    
    rotateZ(rad) {
        let newx = Math.sin(rad + Math.atan2(this.x,this.y)) * Math.sqrt((this.x) * (this.x) + (this.y) * (this.y));
        let newy = Math.cos(rad + Math.atan2(this.x,this.y)) * Math.sqrt((this.x) * (this.x) + (this.y) * (this.y));
        this.x = newx;
        this.y = newy;
        return this;
    }
}