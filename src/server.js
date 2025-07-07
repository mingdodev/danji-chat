const http = require('http');
const { Server } = require('socket.io');

const connectDB = require('./db/mongoose');
const handleSocket = require('./socket');
const app = require('./app');

const PORT = 3000;

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

handleSocket(io);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});