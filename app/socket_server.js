const express = require('express');
const app = express();
const cors = require('cors');
/*
*/
var https=require("https"),
fs=require("fs"),
server=https.createServer(
{
    key:fs.readFileSync("/ssl.key"),
    cert:fs.readFileSync("/te-auxilium.se.crt"),
    ca:[fs.readFileSync("/te-auxilium.se.ca-bundle")]
}, app);

const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('room', (data)=>{
        socket.join(data);
    });
    socket.on('update',(data)=>{
        io.to(data).emit('update', socket.id);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});