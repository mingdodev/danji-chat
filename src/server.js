const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./db/mongoose');
const handleSocket = require('./socket');
const app = require('./app');
require('dotenv').config();

const PORT = 3000;

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

handleSocket(io);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at port ${PORT}`);
});