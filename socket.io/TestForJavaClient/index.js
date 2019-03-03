var express = require('express');
var app = express();
var server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);

app.use(express.static('client'));

console.log("Server listening at port 3000");

var players = [];

class Player{
    constructor(posX, posY, id) {
        this.X = posX;
        this.Y = posY;
        this.ID = id;
        this.isMoving = true;
        this.destX = posX;
        this.destY = posY;
    }
    setPos(newX, newY) {
        this.X = newX;
        this.Y = newY;
    }
    setDir(newX, newY) {
        this.dirX = newX;
        this.dirY = newY;
    }
    
    setDest(newX, newY)
    {
        setDir(newX- this.X, newY - this.Y);
        this.destX = newX;
        this.destY = newY;
    }
    
}

io.sockets.on('connection',(socket) =>{
    console.log("new connection: " + socket.id);
    var ID = 0;
    while(true)
    {
        if(players[ID] == undefined || players[ID] == null)
        {
            break;   
        }
        ID ++;
    }
    //var ID = socket.id;
    var newPlayer = new Player(0,0,ID);
    //newPlayer.destY = 0;
    players[ID] = newPlayer;
    var data = {players, ID};
    socket.emit('init', data);
    socket.broadcast.emit('new player',{ID, newPlayer});
    console.log(newPlayer);
    
    socket.on('move', (data) => {
        //console.log(data);
        //players[data.ID].setPos(data.X, data.Y);
        players[data.ID].X = data.X;
        players[data.ID].Y = data.Y;
        //players[data.ID].dirX = data.dirX;
        //players[data.ID].dirY = data.dirY;
        players[data.ID].isMoving = data.isMoving;
        players[data.ID].destX = data.destX;
        players[data.ID].destY = data.destY;
        socket.broadcast.emit('move', data);
    })
    
    socket.on('disconnect',() =>{
        players[ID] = null;
        socket.broadcast.emit('player disconnected', ID);
        console.log(socket.id + ' has disconnected');
    })
})
