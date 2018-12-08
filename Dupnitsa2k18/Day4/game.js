"use strict";

function signedArea(a,b,c){
    return ((c.x-a.x)*(c.y-b.y)-(c.x-b.x)*(c.y-a.y))/2;
}

function Distance(point1, point2)
{
    return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
}

class Vector2
{
    constructor(x = 0, y = 0)
    {
        this.x = x
        this.y = y
    }
    
    draw(color)
    {
        context.beginPath()
        context.strokeStyle = color
        context.fillStyle = color
        context.arc(this.x,this.y,4,0,2 * Math.PI)
        context.fill()
        context.stroke()
    }
    
    add(other) {return new Vector2(this.x + other.x, this.y + other.y)}
    
    mult(c) {return new Vector2(this.x * c, this.y * c)}
    
    getCopy() {return new Vector2(this.x,this.y)}
}
class Segment
{
    constructor(begin,end)
    {
        this.begin = begin
        this.end = end
    }
    
    delta() {return this.end.add(this.begin.mult(-1))}
    
    draw(color){
        this.begin.draw(color)
        this.end.draw(color)
        
        context.beginPath()
        context.strokeStyle = color
        context.moveTo(this.begin.x, this.begin.y)
        context.lineTo(this.end.x,this.end.y)
        context.stroke()
    }
    
    intersect(a){
        var multi = this.delta().y - a.delta().y * this.delta().x / a.delta().x;
        var other = a.begin.y + a.delta().y * this.begin.x / a.delta().x - a.delta().y * a.begin.x / a.delta().x - this.begin.y;
        var q = other / multi;
        var t = (this.begin.x - a.begin.x + this.delta().x * q) / a.delta().x;
        var ansx = a.begin.x + a.delta().x * t;
        var ansy = a.begin.y + a.delta().y * t;
        if(q > 0 && q < 1 && t > 0 && t < 1){
        return new Vector2(ansx, ansy);
        } else {
            return undefined;
        }
    }
    
    add(translationVector){
        return new Segment(
            this.begin.add(translationVector),
            this.end.add(translationVector));
    }
    
    resize(distance)
    {
        return new Segment(
            this.begin,
            this.begin.add(this.delta().mult(distance / Distance(this.begin,this.end))))
    }
}

function sortRays()
{
    let firstRay = rays[0]
    rays.splice(0,1)
    
    let splitLine = new Segment(firstRay.end.getCopy(), lightSource.getCopy() )
    
    rays.sort((l,r) =>
    {
        
        let lArea = signedArea(splitLine.begin, splitLine.end,l.end)
        let rArea = signedArea(splitLine.begin, splitLine.end,r.end)
        if(lArea < 0 && rArea > 0)
        {
            return -1
        }
        if(lArea > 0 && rArea < 0)
        {
            return 1
        }
        
        if(signedArea(lightSource,l.end,r.end) > 0)
        {
            return -1
        }
        else
        {
            return 1
        }
    })
    rays.unshift(firstRay)
}

let lightSource = new Vector2(300,300)

let segments = []

let wallStart

let WallsPlaced = false

let rays = []

function computeShadow()
{
    rays.push(new Segment(lightSource.getCopy(),new Vector2(0,0)))
    rays.push(new Segment(lightSource.getCopy(),new Vector2(canvas.width,0)))
    rays.push(new Segment(lightSource.getCopy(),new Vector2(canvas.width,canvas.height)))
    rays.push(new Segment(lightSource.getCopy(),new Vector2(0,canvas.height)))
    
    for(let i = 0; i < segments.length; i ++)
    {
        let first = new Segment(lightSource.getCopy(), segments[i].begin.getCopy()).resize(1000)
        let second = new Segment(lightSource.getCopy(), segments[i].end.getCopy()).resize(1000)
        
        first.wallIndex = i
        first.fromPoint = "begin"
        second.wallIndex = i
        second.fromPoint = "end"
        
        rays.push(first)
        rays.push(second)
    }
    sortRays()
    cutRays()
}

function insertWallEdgePoints()
{
    for(let i =0; i < rays.length; i ++)
    {
        
        if(!rays[i].fromPoint)
            continue
        let area = signedArea(lightSource,segments[rays[i].wallIndex].begin.getCopy(),segments[rays[i].wallIndex].end.getCopy())
        let pointToInsert = 
           ((rays[i].fromPoint === "begin") ?
        segments[rays[i].wallIndex].begin.getCopy() :
        segments[rays[i].wallIndex].end.getCopy()).getCopy()
        
        if(area < 0)
        {
            if(rays[i].fromPoint === "begin")
            {
                rays.splice(i,0,new Segment(
                    lightSource.getCopy(),
                    pointToInsert))
            }
            else if(rays[i].fromPoint === "end")
            {
                rays.splice(i + 1,0,new Segment(
                    lightSource.getCopy(),
                    pointToInsert))
            }
        }
        if(area > 0)
        {
            if(rays[i].fromPoint === "begin")
            {
                rays.splice(i,0,new Segment(
                    lightSource.getCopy(),
                    pointToInsert))
            }
            else if(rays[i].fromPoint === "end")
            {
                rays.splice(i + 1,0,new Segment(
                    lightSource.getCopy(),
                    pointToInsert))
            }
        }
        i ++
    }
}

function cutRays()
{
    for(let i = 0; i < rays.length; i ++)
    {
        for(let j = 0; j < segments.length; j ++)
        {
            if(rays[i].wallIndex != j)
            {
                let intersection = rays[i].intersect(segments[j])
                if(intersection)
                {
                    rays[i].end = intersection
                    rays[i].wallIndex = undefined
                    rays[i].fromPoint = undefined
                }
            }
        }
    }
}

function update() {
}
 
function draw() {
    if(!WallsPlaced)
    {
    for(let i = 0; i < rays.length; i ++)
    {
        rays[i].draw("red")
    }
    }
    else
    {
        context.beginPath()
        context.moveTo(rays[0].end.x,rays[0].end.y)
        for(let i = 0; i < rays.length; i ++)
        {
            context.lineTo(rays[i].end.x,rays[i].end.y)
        }
        context.fillStyle = "yellow"
        context.closePath()
        context.fill()
    }
    segments.forEach((s) => s.draw("black"))
    lightSource.draw("red")
    rays.forEach((p) => p.draw("red"))
}

function keyup(key)
{
    if(key == 32)
    {
        WallsPlaced = true
        computeShadow()
    }
}

function keydown()
{
    
}

function mousedown()
{
    if(WallsPlaced)
        return
    wallStart = new Vector2(mouseX,mouseY)
}

function mouseup()
{
    if(WallsPlaced)
        return
    segments.push(new Segment(
        wallStart.getCopy(),
        new Vector2(mouseX,mouseY)
    ))
    
    for(let i = 0; i < segments.length - 1; i ++)
    {
        let intersection = segments[segments.length - 1].intersect(segments[i])
        if(intersection)
        {
            rays.push(new Segment(lightSource,intersection))
        }
    }
}

function mousemove()
{
}