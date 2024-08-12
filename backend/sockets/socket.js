const { tokenMiddleware } = require('../middlewares/token');

const liveRooms = new Map();

const setUpSocket = (io) => {
     io.use(tokenMiddleware);
     
     setInterval(() => {
          liveRooms.forEach((value, key) => {
               if(Date.now() - value.created >= 3600000){
                    liveRooms.delete(key);
               }
          })
     }, 3600000);

     io.on('connection',  (socket) => {
          console.log('user joined');
          socket.on('user-joined', ({room}) => {
               if(liveRooms.has(room)){
                    const currRoom = liveRooms.get(room);
                    const elapsedTime = Date.now() - currRoom.created;
                    if(elapsedTime >= 3600000){
                         io.to(socket.id).emit('inavlid-request');
                         return;
                    }
                    else if(currRoom.isFull < 2){
                         liveRooms.set(room, {
                              created: currRoom.created,
                              isFull: currRoom.isFull + 1
                         }); 
                    }
                    else{
                         io.to(socket.id).emit('invalid-request');
                         return;
                    }
               }
               else{
                    io.to(socket.id).emit('invalid-request');
                    return;
               }
               io.to(socket.id).emit('start-stream');
               socket.join(room);
               socket.broadcast.to(room).emit('new-user-joined', {socketId: socket.id});
               console.log("user entered room");
          }); 
          
          socket.on('create-room', ({roomId}) => {
               console.log("create-room", roomId);
               if(liveRooms.has(roomId)){
                    console.log("room not created");
                    io.to(socket.id).emit('inavlid-request');
               }
               else{
                    console.log("room created");
                    liveRooms.set(roomId, {
                         created: Date.now(),
                         isFull: 0
                    });
               }
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
          });

          socket.on('pause-video', ({socketId}) => {
               socket.to(socketId).emit("pause-video");
          });
     });
}

module.exports = { setUpSocket };