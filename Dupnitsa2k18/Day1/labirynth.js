let xSize = 60
let ySize = 60

let sqSize = 10

let n = xSize * ySize
let m = 2 * xSize * ySize - xSize - ySize

let candidates
let isInTree
let graph
let newEdges

let frameCount = 0;

graph = [n]
for(let i = 0; i < n; i ++)
{
    graph[i] = []
}

function makeGraph()
{
    for(let y = 0; y < ySize; y ++)
    {
        for(let x = 0; x < xSize; x ++)
        {
            let dist = Math.round(Math.random() * 10)
            if(y < ySize-1)
            {
                graph[y * xSize + x].push({
                    to: y * xSize + x + xSize,
                    dist: dist
                })
                graph[y * xSize + x + xSize].push({
                    to: y * xSize + x,
                    dist: dist 
                })
            }
            dist = Math.round(Math.random() * 10)
            if(x < xSize-1)
            {
                graph[y * xSize + x].push({
                    to: y * xSize + x + 1,
                    dist: dist 
                })
                graph[y * xSize + x + 1].push({
                    to: y * xSize + x   ,
                    dist: dist 
                })
            }
        }
    }
}
makeGraph()
newEdges = []
function solve()
{
    isInTree = []
    for(var i = 0; i < n; i ++)
    {
        isInTree[i] = false
    }
    isInTree[0] = true
    candidates = []
    for(let i = 0; i < graph[0].length; i ++)
    {
        candidates.push({from: 0 ,to:graph[0][i].to, dist:graph[0][i].dist});
    }

    while(true)
    {
        //getting the minimal suitable candidate edge
        let min = {dist: Infinity};
        for(let i = 0; i < candidates.length; i ++)
        {
            if(isInTree[candidates[i].to] === false)
            {
                if(min.dist > candidates[i].dist)
                {
                    min = {from: candidates[i].from, to: candidates[i].to, dist: candidates[i].dist}
                }
                else
                {
                    //candidates.splice(i)
                }
            }
        }
        if(min.dist != Infinity)
        {
            //adding the adjacent vertex (X)
            isInTree[min.to] = true
            newEdges.push({from: min.from, to: min.to, dist: min.dist})
            //adding the new candidates(those that go out of X and to not go back into the tree)
            for(let i = 0; i < graph[min.to].length; i ++)
            {
                candidates.push({from: min.to, to: graph[min.to][i].to, dist: graph[min.to][i].dist})
            }
        }
        else
        {
            return
        }
    }
}
solve()

console.log(newEdges)

let wallsOut = []
function translateToWallsArray()
{
    for(let i = 0; i < newEdges.length; i ++)
    {
        wallsOut[i] = true
    }
    for(let i = 0; i < newEdges.length; i ++)
    {
        let from = newEdges[i].from
        let to = newEdges[i].to
        
        if(from > to)
        {
            let c = from
            from = to
            to = c
        }
        
        let id
        if(to - from == 1)
        {
            id = from % (xSize) + Math.floor(from / (xSize)) * (2 * xSize - 1)
        }
        else
        {
            id = from % (xSize) + Math.floor(from / (xSize)) * (2 * xSize - 1) + xSize - 1
        }
        
        wallsOut[id] = false
    }
}
let graphOut = []
function translateToGraph()
{
    for(let i = 0; i < n; i ++)
    {
        graphOut[i] = []
    }
    for(let i = 0; i < newEdges.length; i ++)
    {
        graphOut[newEdges[i].from].push({
            to: newEdges[i].to,
            dist: newEdges[i].dist
        })
        graphOut[newEdges[i].to].push({
            to: newEdges[i].from,
            dist: newEdges[i].dist
        })
    }
}

function update()
{
    
}
function draw()
{
    if(frameCount == 0){
        context.lineWidth = 1
        context.lineStyle = "#000000"
        context.fillStyle = "#000000"
        //drawing a grid
        context.beginPath()
        for(let i = 0; i < xSize; i ++)
        {
            context.moveTo(i * sqSize, 0)
            context.lineTo(i * sqSize, ySize * sqSize)
        }
        for(let i = 0; i < ySize; i ++)
        {
            context.moveTo(0,i * sqSize)
            context.lineTo(xSize * sqSize,i * sqSize)
        }
        context.stroke()
        
        //context.fillRect(0,0,canvas.width,canvas.height)
        
        //digging the holes
        context.beginPath()
        context.strokeStyle = "#ffffff"
        context.lineWidth = 8
        for(let i = 0; i < newEdges.length; i ++)
        {
            let fromID = newEdges[i].from
            let fromXID = fromID % xSize
            let fromYID = Math.floor(fromID / xSize)
            let fromX = fromXID * sqSize + .5 * sqSize
            let fromY = fromYID * sqSize + .5 * sqSize
            
            let toID = newEdges[i].to
            let toXID = toID % xSize
            let toYID = Math.floor(toID / xSize)
            let toX = toXID * sqSize + .5 * sqSize
            let toY = toYID * sqSize + .5 * sqSize
            
            context.moveTo(fromX,fromY)
            context.lineTo(toX,toY)
        }
        context.stroke()
    }
    frameCount ++
}

function keyUp()
{
    
}

function mouseDown()
{

}