class Point{
    constructor (x,y)
    {
        this.pos = new Vector2(x,y)
        this.percent = 0
        this.isUpdating = true
    }

    draw()
    {
        context.beginPath()
        context.arc(this.pos.x,this.pos.y,10,0,2 * Math.PI)
        context.fill()
        //context.closePath()
        context.stroke()
    }
    
    static lerp(A,B,percent)
    {
        let x = 0;
        let y = 0;
        if(A != null && B != null)
        {
            x = (A.x * (1-percent) + B.x * (percent))
            y = (A.y * (1-percent) + B.y * (percent))
        }
        return new Vector2(x,y)
    }
    
    static quadraticCurve(A,B,C,percent)
    {
        let D = Point.lerp(A,B,percent)
        let E = Point.lerp(B,C,percent)
        return Point.lerp(D,E,percent)
    }
    
    static cubicCurve(A,B,C,D,percent)
    {
        let E = Point.quadraticCurve(A,B,C,percent)
        let F = Point.quadraticCurve(B,C,D,percent)
        return Point.lerp(E,F,percent)
    }
}

class Vector2
{
    constructor (x = 0, y = 0)
    {
        this.x = x
        this.y = y
    }
    draw(r)
    {
        context.beginPath()
        context.arc(this.x,this.y,r,0,2 * Math.PI)
        context.fill()
        //context.closePath()
        context.stroke()
    }
}

let road = [
    new Vector2(100,100),
    new Vector2(300,200),
    new Vector2(500,300),
    new Vector2(500,400),
    new Vector2(500,500),
    new Vector2(500,550),
    new Vector2(300,550),
    new Vector2(100,550)
]

let G = new Point(road[0].x, road[0].y)

let frameCount = 0

let trails = []

let isClosed = false

let movementRatio = 0

let whereIsPoint = 0

let curvePoints = []

function update()
{
    
    frameCount ++
    let density = 100
    let id = Math.floor(frameCount / density) * 3
    whereIsPoint = id
    if(!isClosed)
    {
        if(id <= road.length - 3)
        G.pos = Point.cubicCurve(road[id],road[id + 1],road[id + 2],road[id + 3],frameCount / density - (id/3))
    }
    else
    {
        G.pos = curvePoints[frameCount]
        if(curvePoints[frameCount] == undefined)
        console.log(frameCount)
    }
    
    if(current != -1)
    {
        let delta = road[current]
        road[current] = new Vector2(mouseX,mouseY)
        delta = new Vector2(road[current].x - delta.x,road[current].y - delta.y)
        
        if(current % 3 === 2 && current <= road.length - 3)
        {
            road[current + 2].x = road[current + 1].x - (road[current].x - road[current + 1].x)
            road[current + 2].y = road[current + 1].y - (road[current].y - road[current + 1].y)
        }
        else if(current % 3 === 1 && current >= 2)
        {
            road[current- 2].x = road[current - 1].x - (road[current].x - road[current - 1].x)
            road[current- 2].y = road[current - 1].y - (road[current].y - road[current - 1].y)
        }
        else if(current % 3 === 0)
        {
            if(current >= 1)
            road[current-1] = new Vector2(road[current-1].x + delta.x,road[current-1].y + delta.y)
            if(current <= road.length - 2)
            road[current+1] = new Vector2(road[current+1].x + delta.x,road[current+1].y + delta.y)
            
        }
    }
    
    if(!isClosed)
    {
        if(frameCount >= ((road.length-2)/3) * density)
        {
            frameCount = 0
        }
    }
    else{
        if(frameCount >= curvePoints.length-1)
        {
            frameCount = 0
        }
    }
    
    
}
let density = 100
function drawCubicCurve(A,B,C,D)
{
    let id = 0;
    for(let i = 0; i < density; i ++)
    {
        let a
        a = Point.cubicCurve(A,B,C,D,i / density)
        context.lineTo(a.x,a.y)
    }
    context.strokeStyle = "yellow"
    context.lineWidth = 20
}

function calcCubicCurvePoints(A,B,C,D)
{
    let id = 0;
    for(let i = 0; i < density; i ++)
    {
        let a
        a = Point.cubicCurve(A,B,C,D,i / density)
        curvePoints.push(a)
    }
}

function draw()
{
    if(!isClosed)
    {
        context.beginPath()
        context.moveTo(road[0].x,road[0].y)
        for(let i = 0; i < road.length-3 ; i += 3)
        {
            drawCubicCurve(road[i],road[i+1],road[i+2],road[i+3])
        }
        context.stroke()
    }
    else
    {
        context.beginPath()
        context.moveTo(curvePoints[0].x,curvePoints[0].y)
        for(let i = 0; i < curvePoints.length; i ++)
        {
            context.lineTo(curvePoints[i].x,curvePoints[i].y)
        }
        context.lineTo(curvePoints[0].x,curvePoints[0].y)
        context.strokeStyle = "yellow"
        context.lineWidth = 20
        context.stroke()
        
    }
    
    
    context.fillStyle = "red"
    context.lineWidth = 1
    road.forEach((p) => p.draw(5))
    G.draw()
    
    context.beginPath()
    context.lineWidth = 1
    for(let i = 0; i < road.length; i ++)
    {
        if(i % 3 == 0)
        {
            if(i <= road.length - 2)
            {
                context.moveTo(road[i].x,road[i].y)
                context.lineTo(road[i + 1].x, road[i + 1].y)
            }
            if(i >= 1)
            {
                context.moveTo(road[i - 1].x, road[i - 1].y)
                context.lineTo(road[i].x, road[i].y)
            }
        }
    }
    context.strokeStyle = "blue"
    context.stroke()
}

let current = 0
function keydown()
{
    for(let i = 0; i < road.length; i ++)
    {
        if((road[i].x - mouseX) * (road[i].x - mouseX) + (road[i].y - mouseY) * (road[i].y - mouseY) <= 400)
        {
            current = i
        }
    }   
}

function keyup(key)
{
    current = -1
    
    if(key == 13)
    {
        road.push(Point.lerp(road[1],road[0],2))
        road.push(road[0])
        isClosed = true
        
        for(let i = 0; i < road.length-3 ; i += 3)
        {
            calcCubicCurvePoints(road[i],road[i+1],road[i+2],road[i+3])
        }
    }
    if(key == 16)
    {
        console.log(mouseX,mouseY)
    }
}

function mousedown()
{
    if(!isClosed)
    {
        road.push(new Vector2(mouseX,mouseY))
        if((road.length-1) % 3 == 0 )
        {
            if(road.length >= 2)
                road.push(new Vector2(
                road[road.length - 1].x - (road[road.length - 2].x - road[road.length - 1].x),
                road[road.length - 1].y - (road[road.length - 2].y - road[road.length - 1].y)
            ))
        }
    }
}

function mouseup()
{
    
}