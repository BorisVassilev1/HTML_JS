var myX = 385, myY = 530;
var naliavo=false,nadiasno=false;
var vragx=[5],vragy=[5];
var px=[10],py=[10],deltap=[10];
var mri=false,zagub=false,points=0,jivoti=3;
var kartinka1=new Image()
kartinka1.src="invader.png"
var kartinka2=new Image()
kartinka2.src="download.png"
var kartinka3=new Image()
kartinka3.src="ship.jpg"
var a=0
for(var i=0;i<5;i++)
{
    vragx[i]=Math.random()*700;
}
for(var i=0;i<5;i++)
{
    vragy[i]=Math.random()*500-600;
}
for(var i=0;i<10;i++)
{
    py[i]=580;
}
for(var i=0;i<10;i++)
{
    deltap[i]=0;
}
function update() {
    if(mri==false && zagub==false)
    {
        for(var i=0;i<5;i++)
        {
        if(vragy[i]>600)
        {
            if(vragy[i]<700)
            {
                zagub=true;
            }
            vragy[i]=-500;
                vragx[i]=Math.random()*700;
        }
        }
        for(var i=0;i<10;i++)
        {                                
        if(py[i]<0)
        {
            py[i]=580;
            deltap[i]=0
        }
        if(py[i]==580)
        {
            px[i]=myX+32;
        }
        py[i]-=deltap[i];
        }
        if(isKeyPressed[37])
        {
            myX-=7;
        }
        if(isKeyPressed[39])
        {
            myX+=7;
        }
        if(myX<0)
        {
            myX=0;
        }
        if(myX>800 - 74)
        {
            myX= 800 - 74;
        }
        for(var i=0;i<5;i++)
        {
        vragy[i]+=2;
        }
        for (var i=0;i<5;i++){
            for(var q=0;q<10;q++)
            {
        if(areColliding( vragx[i], vragy[i], 100, 100, px[q], py[q], 10, 30))
        {
            vragy[i]=1000;
            py[q]=-100;
            points++;
        }
            }
        if(areColliding( vragx[i], vragy[i], 100, 100, myX, myY, 74, 85))
        {
            jivoti--;
            vragy[i]=1000;
        }
        }
        var imapromqna=false;
        while(imapromqna==false)
        {
        imapromqna=true;
            
        for (var i=0;i<5;i++)
        {
            for(var q=i+1;q<5;q++)
            {
                if(areColliding( vragx[i], vragy[i], 100, 100, vragx[q], vragy[q], 100, 100))
                {
                    vragx[i]=Math.random()*700;
                     vragy[i]=Math.random()*500-600;
                    imapromqna=false;
                }
            }
        }
        }
        if(jivoti==0)
        {
            mri=true;
            for(var i=0;i<5;i++)
            {
                vragy[i]=-100;
            }
            myY=-100;
            for(var i=0;i<10;i++)
            {
                py[i]=1000;
            }
        }
    }
    a++
    if(isKeyPressed[32] && a%10==0)
    {
        for(var i=0;i<10 && py[i]<580;i++)
        {
        }
        deltap[i]=10;
    }
    
    
    
}


function draw() {
    context.fillStyle="#000000"
    context.fillRect(0,0,800,600)
    for(var i=0;i<5;i++)
    {
	   context.drawImage(kartinka1,vragx[i], vragy[i], 100, 100);
    }
    for(var i=0;i<10;i++)
    {
        context.fillStyle="#ffffff"
        context.fillRect(px[i], py[i], 10, 30);
    }
    context.drawImage(kartinka3,myX, myY, 74, 85);
    context.fillStyle="#000000";
    context.fillRect(0,0,800,50);
    context.fillStyle="#ffffff";
    context.font = "50px Arial";
    context.fillText("Score:",0,50);
    context.fillText(points,200,50);
    context.fillText("Lives:",400,50);
    for(var i=0;i<jivoti;i++)
    {
        context.drawImage(kartinka2,600+60*i,0,50,50);
    }
    if(mri==true)
    {
        context.fillStyle='red';
        context.font = "100px Arial";
        context.fillText("YOU DIED!",150,200)
        context.font = "30px Arial"
        context.fillText("Press R to restart!", 300,500)
    }
    if(zagub==true)
    {
        context.fillStyle='red';
        context.font = "100px Arial";
        context.fillText("YOU LOST!",150,200)
        context.font = "30px Arial"
        context.fillText("Press R to restart!", 300,500)
   
    }
}

function keyup(key) {
//    if(key==32)
//    {
//        for(var i=0;i<10 && py[i]<580;i++)
//        {
//        }
//        deltap[i]=10;
//    }
    if(key===82)
    {
        myX = 385
        myY = 530;
        naliavo=false,nadiasno=false;
        vragx=[5],vragy=[5];
        px=[10],py=[10],deltap=[10];
        mri=false
        zagub=false
        points=0
        jivoti=3
        a=0
        for(var i=0;i<5;i++)
        {
            vragx[i]=Math.random()*700;
        }
        for(var i=0;i<5;i++)
        {
            vragy[i]=Math.random()*500-600;
        }
        for(var i=0;i<10;i++)
        {
            py[i]=580;
        }
        for(var i=0;i<10;i++)
        {
            deltap[i]=0;
        }
        console.log("zdr")
    }
    console.log(key)
}
function keydown(key) {
    
}
