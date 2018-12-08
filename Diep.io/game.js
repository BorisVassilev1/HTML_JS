var tank={
    transform:{
        position:{
            x:400,
            y:300
        },
        rotation:0
    },
    speed:4,
    health:50,
    score:0,
    reload:1,
    level_old:0,
    level:0,
    draw:function(){
        context.save();
        context.translate(tank.transform.position.x,tank.transform.position.y)
        context.rotate(tank.transform.rotation);
        context.fillStyle="#a2a2a2"
        context.fillRect(0,-10,45,20)
        context.strokeRect(0,-10,45,20)
        context.restore()
        context.beginPath()
        context.arc(tank.transform.position.x,tank.transform.position.y,25,0,2*Math.PI)
        context.fillStyle="#00bbff"
        context.fill()
        context.stroke()
    }
}
var hrana=[]
var hrana2=[]
var hrana3=[]
for(var i=0;i<500;i++)
{
    hrana[i]={
        transform:{
            position:{
                x:Math.random()*5000,
                y:Math.random()*5000
            }
        },
        health:100
    }
}
for(var i=0;i<100;i++)
{
    hrana2[i]={
        transform:{
            position:{
                x:Math.random()*5000,
                y:Math.random()*5000
            }
        },
        health:200
    }
}
for(var i=0;i<100;i++)
{
    hrana3[i]={
        transform:{
            position:{
                x:Math.random()*5000,
                y:Math.random()*5000
            }
        },
        health:500
    }
}
var bullets=[]
var strelqmli=false
var ab=0;
function update() {
    move()
    var dx=mouseX-400
    var dy=mouseY-300
    tank.transform.rotation=Math.atan2(dy,dx)
    for(var i=0;i<bullets.length;i++)
    {
        if(bullets[i].remaining_life>=0)
        {
            bullets[i].transform.position.x+=bullets[i].transform.delta.x
            bullets[i].transform.position.y+=bullets[i].transform.delta.y
            bullets[i].remaining_life--
        }
    }
    if(strelqmli && ab==tank.reload)
    {
        shoot();
        ab=0;
        
    }
    ab++
    for(var i=0;i<500;i++)
    {
        for(var p=0;p<bullets.length;p++)
        {
            if(areCollCirc(hrana[i].transform.position.x+15,hrana[i].transform.position.y+15,15,bullets[p].transform.position.x,bullets[p].transform.position.y,10) && hrana[i].health>0 && bullets[p].remaining_life>0)
            {
                bullets[p].remaining_life=0;
                hrana[i].health-=bullets[p].dmg
                if(hrana[i].health<=0)
                {
                    hrana[i].transform.position.x=Math.random()*5000
                    hrana[i].transform.position.y=Math.random()*5000
                    hrana[i].health=100
                    tank.score+=10
                }
            }
        }
    }
    for(var i=0;i<100;i++)
    {
        for(var p=0;p<bullets.length;p++)
        {
            if(areCollCirc(hrana2[i].transform.position.x,hrana2[i].transform.position.y,10,bullets[p].transform.position.x,bullets[p].transform.position.y,10) && hrana2[i].health>0 && bullets[p].remaining_life>0)
            {
                bullets[p].remaining_life=0;
                hrana2[i].health-=bullets[p].dmg
                if(hrana2[i].health<=0)
                {
                    hrana2[i].transform.position.x=Math.random()*5000
                    hrana2[i].transform.position.y=Math.random()*5000
                    hrana2[i].health=200
                    tank.score+=50
                }
            }
        }
    }
    for(var i=0;i<100;i++)
    {
        for(var p=0;p<bullets.length;p++)
        {
            if(areCollCirc(hrana3[i].transform.position.x+15,hrana3[i].transform.position.y+15,25,bullets[p].transform.position.x,bullets[p].transform.position.y,10) && hrana3[i].health>0 && bullets[p].remaining_life>0)
            {
                bullets[p].remaining_life=0;
                hrana3[i].health-=bullets[p].dmg
                if(hrana3[i].health<=0)
                {
                    hrana3[i].transform.position.x=Math.random()*5000
                    hrana3[i].transform.position.y=Math.random()*5000
                    hrana3[i].health=500
                    tank.score+=100
                }
            }
        }
    }
    tank.level=Math.floor(Math.sqrt(Math.sqrt(tank.score)))
    if(tank.level>tank.level_old)
    {
        console.log(tank.level)
        tank.level_old=tank.level;
    }
}


//context.scale(0.25,0.25)


function draw() {
    
    
    context.save()
    context.translate(-tank.transform.position.x+400,-tank.transform.position.y+300)
    drawGrid();
    for(var i=0;i<bullets.length;i++)
    {
        if(bullets[i].remaining_life>0)
        {
            context.fillStyle="#f20000"
            context.beginPath()
            context.arc(bullets[i].transform.position.x,bullets[i].transform.position.y,10,0,2*Math.PI)
            context.fill()
            context.stroke()
        }
    }
    tank.draw()
    for(var i=0;i<500;i++)
    {
        if(hrana[i].health>0)
        {
            context.fillStyle="#ffff00"
            context.strokeRect(hrana[i].transform.position.x,hrana[i].transform.position.y,30,30)
            context.stroke()
            context.fillRect(hrana[i].transform.position.x,hrana[i].transform.position.y,30,30)
        }
    }
    for(var i=0;i<100;i++)
    {
        if(hrana2[i].health>0)
        {
            context.fillStyle="#ff0000"
            context.strokeStyle="black"
            mnogougulnik(hrana2[i].transform.position.x,hrana2[i].transform.position.y,20,3)
        }
    }
    for(var i=0;i<100;i++)
    {
        if(hrana3[i].health>0)
        {
            context.fillStyle="#0089ff"
            context.strokeStyle="black"
            mnogougulnik(hrana3[i].transform.position.x,hrana3[i].transform.position.y,25,5)
        }
    }
    context.restore()
    
    
    
        
    
}
function mousedown(){
    strelqmli=true;
    ab=tank.reload
}
function mouseup(){
    strelqmli=false;
    //ab=0;
}
function color(r,g,b)
{
    if(r<16){r=16}
    if(g<16){g=16}
    if(b<16){b=16}
    context.fillStyle="#"+r.toString(16)+g.toString(16)+b.toString(16);
}
function move()
{
    if(isKeyPressed[87])
    {
        w();
    }
    if(isKeyPressed[65])
    {
        a();
    }
    if(isKeyPressed[83])
    {
        s();
    }
    if(isKeyPressed[68])
    {
        d();
    }
}
function w()
{
    tank.transform.position.y-=tank.speed
}
function a()
{
    tank.transform.position.x-=tank.speed
}
function s()
{
    tank.transform.position.y+=tank.speed
}
function d()
{
    tank.transform.position.x+=tank.speed
}
function drawGrid()
{
    	// draw grid
	//context.fillStyle = "#FF0000";
	context.font = "10px Arial";
	if(typeof gridSize != "undefined" && gridSize >= 25) {
		context.fillText(0, 4, 10);
		context.beginPath();
		for(i=gridSize;i<5000/*canvas.width*/;i+=gridSize) {
			context.moveTo(i, 0);
			context.lineTo(i, 5000/*canvas.height*/);
			context.fillText(i, i+4, 10);
		}
		for(i=gridSize;i<5000/*canvas.height*/;i+=gridSize) {
			context.moveTo(0, i);
			context.lineTo(5000/*canvas.width*/, i);
			context.fillText(i, 4, i+10);
		}
        context.strokeStyle="rgb(134, 134, 134)"
        context.strokeWidth=1
		context.stroke();
	}
}
function shoot()
{
    var rx=mouseX-400
    var ry=mouseY-300
    var razst=Math.sqrt((rx)*(rx)+(ry)*(ry))
    bullets.push({
        transform:{
            position:{
                x:tank.transform.position.x,
                y:tank.transform.position.y
            },
            delta:{
                x:rx/razst*7,
                y:ry/razst*7
        }
    },
    speed:10,
    dmg:50,
    remaining_life:150
    })
    bullets[bullets.length-1].speed*=bullets[bullets.length-1].remaining_life/70
    bullets[bullets.length-1].speed*=bullets[bullets.length-1].remaining_life/70
    
}
function areCollCirc(ax,ay,ar,bx,by,br)
{
    if(Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by))<=ar+br)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function mnogougulnik(x,y,r,n)
{
    context.save()
    context.translate(x,y)
    context.beginPath()
    for(var i=0;i<n+1;i++)
    {
        context.rotate(Math.PI*(360/n/180))
        context.lineTo(0,-r)
    }
    context.fill()
    //context.strokeStyle="#2defff"
    context.strokeWidth=100
    context.stroke()
    context.restore()
    context.closePath()
    
}