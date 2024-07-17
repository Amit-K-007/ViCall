const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenMiddleware = (socket, next) => {
    try{
        const auth = socket.handshake.auth.token;
        const token = auth.split(' ');
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET);
        if(decoded.email){
            next();
            return;
        }
    }
    catch(error){
        console.log(error);
        socket.emit({
            msg: "User not authenticated",
            err: error
        });
    }
};

module.exports = { tokenMiddleware };