const express = require('express');
const { Server } = require('socket.io');
const { setUpSocket } = require('./sockets/socket');
const { router } = require('./routes/router');
const cors  = require('cors');
const http = require('http');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: true
});

app.use(cors());
app.use(express.json());
app.use('/auth', router);
setUpSocket(io);

server.listen(port, () => {
    console.log("Server started");
});  