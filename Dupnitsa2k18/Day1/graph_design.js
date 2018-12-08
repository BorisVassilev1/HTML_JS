let final = ""

let x = []
let y = []

let edges = []

let currentID = 0;
let currentID2 = 0;

function update()
{
    if(currentID == x.length)
    {
        x[currentID] = mouseX
        y[currentID] = mouseY
    }
}

function draw()
{
    for(var i = 0; i < x.length; i ++)
    {
        context.fillRect(x[i]-20,y[i]-20, 40,40)
        context.fillStyle = "#ffffff"
        context.fillText(i.toString(), x[i] - 20, y[i]+20)
        context.fillStyle = "#000000"
    }
    for(let i = 0; i < edges.length; i ++)
    {
        context.strokeStyle = "#000000"
        context.strokeWidth = 3
        context.beginPath()
        context.moveTo(x[edges[i].from],y[edges[i].from])
        context.lineTo(x[edges[i].to],y[edges[i].to])
        context.closePath()
        context.stroke()
    }
}

function keydown(keyCode)
{
    if(keyCode == 32)
    {
        x[currentID] = mouseX
        y[currentID] = mouseY
        currentID = x.length-1
        //console.log(currentID)
    }
}
function mousedown()
{
    let indexFrom = 0;
    for(let i = 0; i < x.length; i ++)
    {
        if((x[i] - mouseX) * (x[i] - mouseX) + (y[i] - mouseY) * (y[i] - mouseY) <= 20)
        {
            indexFrom = i
            break
        }
    }
    edges.push({from: indexFrom,to: 0,dist: 0})
    currentID2 = edges.length-1
}

function keyup(keyCode)
{
    if(keyCode == 32)
    {
        currentID ++;
    }
}
function mouseup()
{
    for(let i = 0; i < x.length; i ++)
    {
        if((x[i] - mouseX) * (x[i] - mouseX) + (y[i] - mouseY) * (y[i] - mouseY) <= 20)
        {
            edges[currentID2].to = i
            break
        }
    }
    currentID2 ++
    console.log(edges)
}
