let vertices = [];
let graph = [];

let target = new Vector2(800,600);

let walls = [
    new Line(new Vector2(300,100), new Vector2(300,300)),
    new Line(new Vector2(50,200), new Vector2(400,200)),
    new Line(new Vector2(500,100), new Vector2(500,500)),
    new Line(new Vector2(400,400), new Vector2(700,400)),
    new Line(new Vector2(600, 500), new Vector2(600,300))
];

function update() {
}

function calculate() {
    vertices = [];
    graph =[];
    vertices.push(new Vector2(0,0));
    vertices.push(target);
    for(let i = 0; i < walls.length; i ++) {
        let v1 = walls[i].v1.clone().sub(walls[i].vector);
        let v2 = walls[i].v2.clone().add(walls[i].vector);
        vertices.push(v1);
        vertices.push(v2);
    }
    for(let i = 0; i < vertices.length; i ++) {
        graph[i] = [];
    }
    ctx.fillStyle = "FFFFFF"
    for(let from = 0; from < vertices.length; from ++) {
        for(let to = 0; to < vertices.length; to ++) {
            if(from == to) continue;
            let line = new Line(vertices[from], vertices[to]);
            let intersects = false
            for(const wall of walls) {
                let result = line.intersection(wall) 
                if(result instanceof Vector2) {
                    //ctx.fillRect(result.x - 5, result.y - 5, 10,10);
                    //console.log("intercestion at: " + result.x + " " + result.y)
                    intersects = true;
                }
                result = wall.intersection(line);
                if(result instanceof Vector2) {
                    //ctx.fillRect(result.x - 5, result.y - 5, 10,10);
                    //console.log("intercestion at: " + result.x + " " + result.y)
                    intersects = true;
                }
//                if(line.intersectionBool(wall)) intersects = true;
            }
            if(!intersects) {
                graph[from].push({to: to, dist: line.length()});
            }
        }
    }
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#FF0000";
    for(const l of walls) {
        l.draw();
    }
    ctx.stroke();
    
//    ctx.fillStyle = "#ebff00";
//    for(const v of vertices) {
//        ctx.fillRect(v.x-2,v.y-2,4,4);
//    }
    ctx.strokeStyle = "#00FF00";
//    ctx.beginPath();
//    for(let i = 0; i < vertices.length; i ++) {
//        for(let j = 0; j < graph[i].length; j ++) {
//            let v1 = vertices[i];
//            let v2 = vertices[graph[i][j].to];
//            ctx.moveTo(v1.x, v1.y);
//            ctx.lineTo(v2.x, v2.y);
//            ctx.stroke();
//        }
//    }
    let path = dijxtra(graph,0,1);
    //console.log(path);
    ctx.beginPath();
    ctx.moveTo(vertices[1].x, vertices[1].y);
    for(let i = 0; i < path.length; i ++) {
        ctx.lineTo(vertices[path[i]].x, vertices[path[i]].y);
    }
    ctx.stroke();
    
    window.requestAnimationFrame(draw);
}

function mouseUp(ev) {
    target.set(ev.x, ev.y);
    calculate();
}

window.requestAnimationFrame(draw);

calculate()
draw();
//setInterval(update, 10);

