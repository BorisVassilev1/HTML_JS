class Point{
    constructor (x,y)
    {
        this.pos = new Vector2(x,y)
        this.percent = 0
        this.where = 0
        this.road = []
        this.setBetween(this.road[this.where],this.road[this.where+1])
        this.isUpdating = true
    }

    draw()
    {
        context.beginPath()
        context.arc(this.pos.x,this.pos.y,10,0,2 * Math.PI)
        context.fill()
        context.closePath()
        context.stroke()
    }
    lerp()
    {
        if(this.A != null && this.B != null)
        {
            this.pos.x = (this.A.x * (1-this.percent) + this.B.x * (this.percent))
            this.pos.y = (this.A.y * (1-this.percent) + this.B.y * (this.percent))
        }
    }
    
    setBetween(a,b)
    {
        this.A = a
        this.B = b
    }
    
    update()
    {
        if(this.isUpdating)
        {
        this.percent += 0.01
        if(this.percent >= 1)
        {
            this.percent = 0;
            this.where += 1
            if(this.where >= this.road.length-1)
            {
                this.where = 0
            }
            this.setBetween(this.road[this.where],this.road[this.where + 1])
            //console.log(this.where)
        }
        this.lerp()
        }
    }
    
    setRoad(road)
    {
        this.road = road
    }
}

class Vector2
{
    constructor (x = 0, y = 0)
    {
        this.x = x
        this.y = y
    }
    draw()
    {
        context.beginPath()
        context.arc(this.x,this.y,5,0,2 * Math.PI)
        context.fill()
        context.closePath()
        context.stroke()
    }
}

let road = [
    new Vector2(100,100),
    new Vector2(500,300),
    new Vector2(700,200),
    new Vector2(600,500),
    new Vector2(300,400),
    new Vector2(100,590),
    new Vector2(50,300),
    new Vector2(100,100)
]

let C = new Point(road[0].x, road[0].y)
let D = new Point(road[0].x, road[0].y)
let E = new Point(road[0].x, road[0].y)

let frameCount = 0

C.setRoad(road)
D.setRoad(road)

D.isUpdating = false

let trails = []


function update()
{
    E.setRoad([D.pos,C.pos])
    
    if(C.where >=1){
        D.isUpdating = true
    }
    if(C.where === 0){
        C.isUpdating = false
    }
    if(D.where === 0 && C.where === 0){
        C.isUpdating = true
        D.isUpdating = false
        trails = []
    }
    //console.log(C.isUpdating)
    D.update()
    C.update()
    frameCount ++
    
    E.update()
    if(frameCount % 10 ==0)
    trails.push(new Vector2(E.pos.x,E.pos.y))
}
function draw()
{
    context.fillStyle = "red"
    for(let i = 0; i < road.length; i ++)
    {
        road[i].draw()
    }
    //C.draw()
    //D.draw()
    E.draw()
    trails.forEach((p) => p.draw())
}

function keyUp()
{
    
}

function mouseDown()
{

}