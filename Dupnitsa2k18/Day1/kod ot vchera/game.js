let n = 5
let m = 6

let candidates
let isInTree
let graph
let newEdges

let rebra = [
    {from: 0,to: 1, dist: 2},
    {from: 0,to: 3, dist: 2},
    {from: 1,to: 2, dist: 3},
    {from: 2,to: 3, dist: 5},
    {from: 2,to: 4, dist: 2},
    {from: 3,to: 4, dist: 2},
]

graph = [n]
for(let i = 0; i < n; i ++)
{
    graph[i] = []
}
newEdges = []
function solve()
{
    for(let i = 0; i < m;i ++)
    {
        //graph[rebra[i].from] = []
        graph[rebra[i].from].push({to: rebra[i].to, dist: rebra[i].dist})
        graph[rebra[i].to].push({to: rebra[i].from, dist: rebra[i].dist})
    }
    console.log(graph)

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

function update()
{
    
}
function draw()
{
    
}

function keyUp()
{
    
}

function mouseDown()
{

}