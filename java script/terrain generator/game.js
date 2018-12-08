var myX = 0, myY = 0;
var n,r,g,b
var w=3000,h=3000
var resolution=1000



function color(red,green,blue) {
    if(red<16){red=16}
    if(green<16){green=16}
    if(blue<16){blue=16}
    if(red>255){red=255}
    if(green>255){green=255}
    if(blue>255){blue=255}
    context.fillStyle = "#" + red.toString(16) + green.toString(16) + blue.toString(16);
    
}


var noise1=[resolution]
for(var i=0;i<resolution;i++)
    {
        noise1[i]=[resolution]
    }
var noise2=[resolution]
for(var i=0;i<resolution;i++)
    {
        noise2[i]=[resolution]
    }
var noise3=[resolution]
for(var i=0;i<resolution;i++)
    {
        noise3[i]=[resolution]
    }
var noise=[resolution]
for(var i=0;i<resolution;i++)
    {
        noise[i]=[resolution]
    }



function generate(array,seed,size,color_count)
    {
        for(var x=0;x<resolution;x++)
            {
                for(var y=0;y<resolution;y++)
                    {
                        n = PerlinNoise.noise( x*size/300+seed, y*size/300+seed, 1 );
                        array[x][y]= Math.round(n*color_count)*Math.round(255/color_count)
            
                    }
            }
}

generate(noise1,Math.random()*1000000,2,255)
generate(noise2,Math.random()*1000000,8,255)
generate(noise3,Math.random()*1000000,16,255)



for(var x=0;x<resolution;x++)
    {
        for(var y=0;y<resolution;y++)
            {
                noise[x][y]=Math.floor(Math.pow((noise1[x][y]+0.25*noise2[x][y]+0.0625*noise3[x][y])/1.3125,2)/150)
                
            }
    }



//function draw() {
    for(var x=0;x<resolution;x++)
    {
        for(var y=0;y<resolution;y++)
        {
            
            if(noise[x][y]<50)      {color(noise[x][y]*3,noise[x][y]*3,255)}
            else if(noise[x][y]<55) {color(255,255,noise[x][y])}
            else if(noise[x][y]<130){color(noise[x][y],220,noise[x][y])}
            else{
                color(noise[x][y],noise[x][y],noise[x][y])
            }
            context.fillRect(w/resolution*x,h/resolution*y,w/resolution,h/resolution)
            
        }
    }
    
    
//}
//function draw(){}
function update(){}
