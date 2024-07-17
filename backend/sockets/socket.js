const { tokenMiddleware } = require('../middlewares/token');

const setUpSocket = (io) => {
     io.use(tokenMiddleware);

     io.on('connection',  (socket) => {
          console.log('user joined');
          socket.on('user-joined', ({email, room}) => {
               console.log("user entered room");
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

          socket.on('close-call', ({socketId}) => {
               socket.to(socketId).emit('close-call', {socketId: socket.id});
          })
     });
}

module.exports = { setUpSocket };