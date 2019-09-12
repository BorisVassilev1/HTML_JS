let TESTS_PER_FITNESS_CALCULATION = 100;//doesnt change anything
let GENERATIONS = 1000;
let NETWORKS_PER_GENERATION = 10000;

function f(a,b) {return a + b};

let bestResult = -Infinity;


class NeuralNetwork
{
    constructor(layers, layerSizes)
    {
        this.fitness = 0;
        //neurons[layers][layerSizes][connections]
        this.neurons = [layers];
        this.layersCount = layers;
        for(let i = 0; i < layers /*- 1*/ ; i++)
        {
            layerSizes[i] ++;
        }
        this.layerSizes = layerSizes;
        for(let i = 0; i < layers; i ++)
        {
            this.neurons[i] = [layerSizes[i]];
            for(let j = 0; j < layerSizes[i]; j ++)
            {
                this.neurons[i][j] ={synapses:[layerSizes[+1]],value: 0}
                //this.neurons[i][j].value =  j == layerSizes[i] - 1 ? 1 : 0;
                for(let k = 0; k < layerSizes[i+1]; k ++)
                {
                    this.neurons[i][j].synapses[k] = {to: k, W: Math.random(0,1)/*default synaps velue*/};
                }
            }
        }
    }
    
    ans(input)
    {
        //reset
        for(let i = 0; i < this.layersCount; i ++)
        {
            for(let j = 0; j < this.layerSizes[i] ; j ++)
            {
                this.neurons[i][j].value = 0;
                //this.neurons[i][j].value = (j == this.layerSizes[i] /*&& i != this.layersCount - 1*/) - 1 ? 1 : 0;
            }
        }
        //load the input
        for(let i = 0; i < this.layerSizes[0] - 1 ; i ++)
        {
            this.neurons[0][i].value = input[i];
        }
        //calculate
        for(let layer = 0; layer < this.layersCount - 1; layer ++)
        {
            for(let neuron = 0; neuron < this.layerSizes[layer]; neuron ++)
            {
                for(let synapsID = 0; synapsID < this.neurons[layer][neuron].synapses.length; synapsID ++)
                {
                    let synaps = this.neurons[layer][neuron].synapses[synapsID];
                    this.neurons[layer + 1][synaps.to].value += synaps.W * this.neurons[layer][neuron].value;
                }
            }
            //sigmoid to (0,1)
//            for(let neuron = 0; neuron < this.layerSizes[layer + 1]; neuron ++)
//            {
//                this.neurons[layer + 1][neuron].value = this.sigmoid(this.neurons[layer + 1][neuron].value)
//            }
        }
        //generate output
        let out = [];
        for(let i = 0; i < this.layerSizes[this.layersCount - 1]; i ++)
        {
            out[i] = this.neurons[this.layersCount - 1][i].value;
        }
        
        return out;
    }
    sigmoid(x)
    {
        return 1/(1+Math.pow(Math.E,-x))
    }
    
    cloneWithMutations(chanceToMutate, rareMutation)
    {
        let newLayerSizes = [];
        for(let i = 0; i < this.layersCount; i ++)
        {
            newLayerSizes[i] = this.layerSizes[i] - 1;
        }
        let nn = new NeuralNetwork(this.layersCount, newLayerSizes);
        let newNeurons = []
        for(let i = 0; i < this.layersCount; i ++)
        {
            newNeurons[i] = [this.layerSizes[i]];
            for(let j = 0; j < this.layerSizes[i]; j ++)
            {
                newNeurons[i][j] ={synapses:[this.layerSizes[+1]],value: 0}
                //newNeurons[i][j].value = j == this.layerSizes[i] - 1 ? 1 : 0;
                for(let k = 0; k < this.layerSizes[i+1]; k ++)
                {
                    let random = Math.random();
                    let delta =  random < chanceToMutate ? randomBetween(-0.02,0.02) : 0;
                    newNeurons[i][j].synapses[k] = {to: k, W: this.neurons[i][j].synapses[k].W + delta};
                    if(random < rareMutation)
                        newNeurons[i][j].synapses[k] = {to: k, W: Math.random()};
                }
            }
        }
        nn.neurons = newNeurons;
        return nn;
    }
    
    calcFitness()
    {
        let result = 0;
        for(let i = 0; i < 1; i += 0.1)
        {
            for(let j = 0; j < 1; j += 0.1)
            {
                let diff = Math.abs(this.ans([i,j])[0] - f(i,j));
                //diff /= 10;
                result -= diff;
            }
        }
        this.fitness = result;
        return result;
    }
}

let neuralNetworks = [];
for(let i = 0; i < NETWORKS_PER_GENERATION; i ++)
{
    neuralNetworks[i] = new NeuralNetwork(3,[2,3,1]);
}
sortByFitness();
let xoffset = 60;
let yoffset = 60;



function sortByFitness()
{
    for(let i = 0; i < NETWORKS_PER_GENERATION; i ++)
    {
        neuralNetworks[i].calcFitness();
    }
    neuralNetworks.sort((a,b) => {
        return a.fitness > b.fitness ? -1 : 1;
    });
}

function newGeneration()
{
    for(let i = NETWORKS_PER_GENERATION / 2; i < NETWORKS_PER_GENERATION; i ++)
    {
        neuralNetworks[i] = neuralNetworks[i - NETWORKS_PER_GENERATION / 2].cloneWithMutations(0.3,0.03);
    }
}

function train()
{
    for(let i = 0; i < GENERATIONS; i ++)
    {
        sortByFitness();
        newGeneration();
        if(neuralNetworks[0].fitness > bestResult)
        {
            bestResult = neuralNetworks[0].fitness;
            console.log(neuralNetworks[0].fitness);
        }
    }
}


function update() {
    
}
//train();
function draw() {
    context.scale(2,2)
    context.strokeWidth = 100;
    context.translate(20,20);
    let nn = neuralNetworks[0];
    for(let layer = 0; layer < nn.layersCount; layer ++) {
        for(let neuronID = 0; neuronID < nn.layerSizes[layer]; neuronID ++) {
            context.fillRect(layer * xoffset - 5, neuronID * yoffset - 5, 10,10);
            //context.globalAlpha = 0.1;
            for(let synapsID = 0; synapsID < nn.neurons[layer][neuronID].synapses.length; synapsID ++)
            {
                let synaps = nn.neurons[layer][neuronID].synapses[synapsID];
                context.strokeStyle = "rgb(" + synaps.W * 255 + "," + synaps.W * 255 + "," + synaps.W * 255 + ")";
                //console.log(synaps);
                context.beginPath();
                context.moveTo(layer * xoffset,neuronID * yoffset);
                context.lineTo((layer + 1) * xoffset, synaps.to * yoffset);
                context.stroke();
            }
            context.globalAlpha = 1;
        }
    }
    context.translate(-20,-20);
    context.scale(0.5,0.5);
}
function randomBetween(min,max)
{
    return Math.random() * (max - min) - min;
}