var myX = 234, myY =442 ;
var i=0;
var kudepacmanx=9;
var kudepacmany=18;
var luft = 4;
var duhchex=234,duhchey=286
var posoka=0;
//Math.floor(Math.random()*4)
var kudeduhx=9
var kudeduhy=11
var pacman=new Image()
pacman.src="pacman-nadiasno.png"
var duhche=new Image()
duhche.src="Ghost.png"
var jivoti=3

 pole= new Array()
 //19*23
 pole[0]= new Array("#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#" );
 pole[1]= new Array("#"," "," "," "," "," "," "," "," ","#"," "," "," "," "," "," "," "," ","#" );
 pole[2]= new Array("#"," ","#","#"," ","#","#","#"," ","#"," ","#","#","#"," ","#","#"," ","#" );
 pole[3]= new Array("#"," ","#","#"," ","#","#","#"," ","#"," ","#","#","#"," ","#","#"," ","#" );
 pole[4]= new Array("#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#" );
 pole[5]= new Array("#"," ","#","#"," ","#"," ","#","#","#","#","#"," ","#"," ","#","#"," ","#" );
 pole[6]= new Array("#"," ","#","#"," ","#"," "," "," ","#"," "," "," ","#"," ","#","#"," ","#" );
 pole[7]= new Array("#"," "," "," "," ","#","#","#"," ","#"," ","#","#","#"," "," "," "," ","#" );
 pole[8]= new Array("#","#","#","#"," ","#"," "," "," "," "," "," "," ","#"," ","#","#","#","#" );
 pole[9]= new Array("a","a","a","#"," ","#"," ","#","#"," ","#","#"," ","#"," ","#","a","a","a" );
pole[10]= new Array("#","#","#","#"," ","#"," ","#","a","a","a","#"," ","#"," ","#","#","#","#" );
pole[11]= new Array(" "," "," "," "," "," "," ","#","a","a","a","#"," "," "," "," "," "," "," " );
pole[12]= new Array("#","#","#","#"," ","#"," ","#","#","#","#","#"," ","#"," ","#","#","#","#" );
pole[13]= new Array("a","a","a","#"," ","#"," "," "," "," "," "," "," ","#"," ","#","a","a","a" );
pole[14]= new Array("#","#","#","#"," ","#"," ","#","#","#","#","#"," ","#"," ","#","#","#","#" );
pole[15]= new Array("#"," "," "," "," "," "," "," "," ","#"," "," "," "," "," "," "," "," ","#" );
pole[16]= new Array("#"," ","#","#"," ","#","#","#"," ","#"," ","#","#","#"," ","#","#"," ","#" );
pole[17]= new Array("#"," "," ","#"," "," "," "," "," "," "," "," "," "," "," ","#"," "," ","#" );
pole[18]= new Array("#","#"," ","#"," ","#"," ","#","#","#","#","#"," ","#"," ","#"," ","#","#" );
pole[19]= new Array("#"," "," "," "," ","#"," "," "," ","#"," "," "," ","#"," "," "," "," ","#" );
pole[20]= new Array("#"," ","#","#","#","#","#","#"," ","#"," ","#","#","#","#","#","#"," ","#" );
pole[21]= new Array("#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#" );
pole[22]= new Array("#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#" );
 
function color(r,g,b)
{
    if(r<16){r=16}
    if(g<16){g=16}
    if(b<16){b=16}
    context.fillStyle="#"+r.toString(16)+g.toString(16)+b.toString(16);
}
function izberiposoka()
{
     var mojeli=false
    while( mojeli==false)
    {
        mojeli=false
        posoka=Math.floor(Math.random()*4)
        if(posoka==0 && pole[kudeduhy-1][kudeduhx]!="#")
        {
            mojeli=true;
        }
        if(posoka==1 && pole[kudeduhy+1][kudeduhx]!="#")
        {
            mojeli=true;
        }
        if(posoka==2 && pole[kudeduhy][kudeduhx-1]!="#")
        {
            mojeli=true;
        }
        if(posoka==3 && pole[kudeduhy][kudeduhx+1]!="#")
        {
            mojeli=true;
        }
        
    }
}

function update() 
{
    
//pacman:
    kudepacmanx=Math.floor(myX/26);
    kudepacmany=Math.floor(myY/26);
    pole[kudepacmany][kudepacmanx]="a"
	
    if(isKeyPressed[38])  
    {
		next = Math.floor((myY-1)/26);
		if(myY>0 && pole[kudepacmany][kudepacmanx]!="#" && pole[next][kudepacmanx]!="#" && (myX%26 < luft))
		{
			myY-=2
			pacman.src="pacman-nagore.png"
		}
    }
    
    if(isKeyPressed[37])
    {
		next = Math.floor((myX-1)/26);
		if(myX>1 && pole[kudepacmany][kudepacmanx]!="#" && pole[kudepacmany][next]!="#" && (myY%26 < luft))
		{
			myX-=2
			pacman.src="pacman-naliavo.png"
		}
    }
    if(isKeyPressed[40])
    {
		next = Math.floor((myY+1)/26);
		if(kudepacmany<22 && pole[kudepacmany+1][kudepacmanx]!="#" && pole[next][kudepacmanx]!="#" && (myX%26 < luft))
		{
			myY+=2
			pacman.src="pacman-nadolu.png"
		}
    }
    if(isKeyPressed[39])
    {
		next = Math.floor((myX+1)/26);
		if(kudepacmanx<19 && pole[kudepacmany][kudepacmanx+1]!="#" && pole[kudepacmany][next]!="#" && (myY%26 < luft))
		{
			myX+=2
			pacman.src="pacman-nadiasno.png"
		}
    }
    
    //duhche:
    kudeduhx=Math.floor(duhchex/26);
    kudeduhy=Math.floor(duhchey/26);
    step = 2;
    if(posoka==0 && pole[kudeduhy][kudeduhx]!="#" && pole[Math.floor((duhchey-step)/26)][kudeduhx]!="#" )
    {
        duhchey-=step
    }
    else if(posoka==1 && pole[kudeduhy][kudeduhx]!="#" && pole[Math.ceil((duhchey+step)/26)][kudeduhx]!="#")
    {
        duhchey+=step
    }
    else if(posoka==2 && pole[kudeduhy][kudeduhx]!="#" && pole[kudeduhy][Math.floor((duhchex-step)/26)]!="#")
    {
        duhchex-=step
    }
    else if(posoka==3 && pole[kudeduhy][kudeduhx]!="#" && pole[kudeduhy][Math.ceil((duhchex+step)/26)]!="#")
    {
        duhchex+=step
    }
    else
    {
        izberiposoka()
    }
    
    
    
    if(myX>=18*26)
    {
        myX=1;
    }
    if(myX<=1)
    {
        myX=18*26;
    }
    
    
}

function draw() 
{
    
    context.fillStyle="black"
    context.fillRect(0,0,800,600)
    color(0,0,255)
    for(var y=0;y<23;y++)
    {
        for(var x=0;x<19;x++)
        {
            if(pole[y][x]=="#")
            {
                context.fillStyle="blue"
                context.fillRect(x*26,y*26,26,26)
            }
            else if(pole[y][x]==" ")
            {
                context.fillStyle="white"
                context.fillRect(x*26+12,y*26+12,2,2)
            }
        }
    }  
    context.drawImage(pacman,myX,myY,26,26)
    context.drawImage(duhche,duhchex,duhchey,26,26)
    for(var i=0;i<jivoti;i++)
        {
            context.drawImage(pacman,500+i*26,0,26,26)
        }
}

function keyup(key) {
}
function mouseup() {
}
