var socket;
var ID = 0;
var speed = 2;

var players = [];

function setup() {
    socket = io.connect('http://localhost:25565');
    socket.on('init', (data) => {
        console.log(data);
        players = data.players;
        ID = data.ID;
    });
    socket.on('new player', (data) => {
        players[data.ID] = data.newPlayer;
    });
    socket.on('move', (data) => {
        //players[data.ID].setPos(data.X, data.Y);
        players[data.ID].X = data.X;
        players[data.ID].Y = data.Y;
    });
    socket.on('player disconnected', (data) => {
        players[data] = null;
    });
}

function update() {
    if(isKeyPressed[40])
    {
        players[ID].Y += speed;
        updatePosition();
    }
    if(isKeyPressed[39])
    {
        players[ID].X += speed;
        updatePosition();
    }
    if(isKeyPressed[38])
    {
        players[ID].Y -= speed;
        updatePosition();
    }
    if(isKeyPressed[37])
    {
        players[ID].X -= speed;
        updatePosition();
    }
}

function draw() {
    for(var i = 0; i < players.length; i ++)
    {
        if(players[i] != null)
        {
            if(i == ID)
            {
                context.fillStyle = "#FF0000";
                context.fillRect(players[i].X, players[i].Y, 30, 30);
            }
            else
            {
                context.fillStyle = "#0000FF";
                context.fillRect(players[i].X, players[i].Y, 30, 30);
            }
        }
    }
}

function updatePosition()
{
    var X = players[ID].X;
    var Y = players[ID].Y;
    
    socket.emit('move', {X, Y, ID});
}
