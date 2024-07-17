const express = require('express');
const { Server } = require('socket.io');
const { setUpSocket } = require('./sockets/socket');
const { router } = require('./routes/router');
const cors  = require('cors');

const app = express();
const io = new Server(3001, {
    cors: true
});

app.use(cors());
app.use(express.json());
app.use('/auth', router);
setUpSocket(io);

app.listen(3000, () => {
    console.log("Server started");
});  