let teapotVertices = [];
let teapotIndices = [];

for(const line of rawIndices.split('\n')) {
    let words = line.split(' ').map(Number);
    let inc = 1;
    for(let i = 0; i < words.length; i+=inc) {
        //console.log(words[i])
        inc = words[i] + 1;
        if(words[i] == 4) {
            teapotIndices.push(words[i + 1])
            teapotIndices.push(words[i + 2])
            teapotIndices.push(words[i + 3])
            teapotIndices.push(words[i + 4])
        }
        else if(words[i] == 3) {
            teapotIndices.push(words[i + 1])
            teapotIndices.push(words[i + 2])
            teapotIndices.push(words[i + 3])
            teapotIndices.push(words[i + 1])
        }
    }
}

for(const line of rawVertices.split('\n')) {
    let words = line.split(' ').map(Number);
    //console.log(words);
    let vec = new Vector3(words[0], words[4], words[2]);
    teapotVertices.push(vec);
    //console.log(vec);
    //console.log(words[0] + " " + words[1] + " " + words[2]);
}

let teapot = new Object3d(new Mesh(teapotVertices,teapotIndices), new Vector3(0,0,0));

teapotVertices = null;
teapotIndices = null;