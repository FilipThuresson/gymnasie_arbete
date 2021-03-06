const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
 
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
        console.log(data);
        io.to(data.room).emit('update', data);
    });
});
 
server.listen(3000, () => {
  console.log('listening on *:3000');
});
