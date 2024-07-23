const express = require('express');
const { Server } = require('socket.io');
const { setUpSocket } = require('./sockets/socket');
const { router } = require('./routes/router');
const cors  = require('cors');

const socketPort = process.env.PORT2 || 3001;
const port = process.env.PORT || 3000;
const app = express();
const io = new Server(socketPort, {
    cors: true
});

app.use(cors());
app.use(express.json());
app.use('/auth', router);
setUpSocket(io);

app.listen(port, () => {
    console.log("Server started");
});  