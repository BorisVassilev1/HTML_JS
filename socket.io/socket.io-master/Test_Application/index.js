// Setup basic express server
var express = require('express');
var app = express();
var server = app.listen(25565);
var socket = require('socket.io');
var io = socket(server);

app.use(express.static('client'));

console.log("Server listening at port 25565");

var players = [];

class Player{
    constructor(posX, posY, id) {
        this.X = posX;
        this.Y = posY;
        this.ID = id;
    }
    setPos(newX, newY) {
        this.X = newX;
        this.Y = newY;
    }
}

io.sockets.on('connection',(socket) =>{
    var address = socket.request.connection.remoteAddress;
    console.log("new connection: " + socket.id + " ip: " + address);
    var ID = 0;
    while(true)
    {
        if(players[ID] == undefined || players[ID] == null)
        {
            break;   
        }
        ID ++;
    }
    var newPlayer = new Player(0,0,ID);
    players[ID] = newPlayer;
    var data = {players, ID};
    socket.emit('init', data);
    socket.broadcast.emit('new player',{ID, newPlayer})
    
    socket.on('move', (data) => {
        //console.log(data);
        //players[data.ID].setPos(data.X, data.Y);
        players[data.ID].X = data.X;
        players[data.ID].Y = data.Y;
        socket.broadcast.emit('move', data);
    })
    
    socket.on('disconnect',() =>{
        players[ID] = null;
        socket.broadcast.emit('player disconnected', ID);
        console.log(socket.id + ' has disconnected');
    })
})
