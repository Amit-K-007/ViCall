const express = require('express');
const {Server} = require('socket.io');

const app = express();
const io = new Server(3001, {
    cors: true
});

io.on('connection', (socket) => {
    console.log('user joined');
   socket.on('user-joined', ({email, room}) => {
        socket.join(room);
        socket.broadcast.to(room).emit('new-user-joined', {socketId: socket.id});
   }); 

   socket.on('nego-start', ({target, sdp}) => {
        socket.to(target).emit('nego-offer', {
            caller: socket.id,
            sdp: sdp
        });
   });

   socket.on('nego-answer', ({target, sdp}) => {
        socket.to(target).emit('nego-done', {sdp})
   });

   socket.on('ice-candidate', ({reciever, candidate}) => {
        socket.to(reciever).emit('ice-request', {candidate});
   });
});

app.listen(3000, () => {
    console.log("Server started");
});