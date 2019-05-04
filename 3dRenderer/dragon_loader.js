let dragonVertices = [];
let dragonIndices = [];

let wtf = 0;
for(const line of dragonObj.split('\n')) {
    let words = line.split(' ');
    //console.log(words);
    if(words[0] == "v"){
        let vec = new Vector3(Number(words[2]), -Number(words[3]), Number(words[4]));
        dragonVertices.push(vec);
        if(vec == undefined)
        {
            console.log(vec);
        }
    } else if(words[0] == "f") {
        wtf++;
        if(wtf % 1 != 0) continue;
        dragonIndices.push(Number(words[1])-1);
        dragonIndices.push(Number(words[2])-1);
        dragonIndices.push(Number(words[3])-1);
//        if(Number(words[1]) >= dragonVertices.length || Number(words[2]) >= dragonVertices.length || Number(words[3]) >= dragonVertices.length)
//        console.log(Number(words[1]) + " " + Number(words[2]) + " " + Number(words[3]))
    }
    
}

let dragon = new Object3d(new Mesh(dragonVertices,dragonIndices),new Vector3(0,0,0));

dragonVertices = null;
dragonIndices = null;