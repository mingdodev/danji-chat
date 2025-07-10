const jwt = require('jsonwebtoken');

const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');

const handleSocket = (io) => {
    io.use((socket, next) => {
        try {
            const authHeader = socket.handshake.headers["authorization"];

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return next(new Error("AUTH_INVALID: 잘못된 토큰입니다."))
            }

            const accessToken = authHeader.split(' ')[1];
            const decodedSecret = Buffer.from(process.env.JWT_SECRET_KEY, 'base64');
            const decoded = jwt.verify(accessToken, decodedSecret);
            socket.user = decoded;
            next();
        } catch (err) {
            return next(new Error("AUTH_INVALID: 잘못된 토큰입니다."))
        }
    })
    io.on("connection", (socket) => {
        console.log("user connected: ", socket.user.userId);

        socket.on("joinRoom", async ({ userId, targetId }) => {
            try {
                let room = await ChatRoom.findOne({ participants: { $all: [userId, targetId] } });

                if (!room) {
                    room = await ChatRoom.create({ participants: [userId, targetId] });
                }

                socket.join(room._id.toString());
                const messages = await Message.find({ roomId: room._id });
                socket.emit("previousMessages", {
                    roomId: room._id,
                    messages: messages,
                });
            } catch (error) {
                console.error("Error in joinRoom:", error);
                socket.emit("error", { message: "Failed to join room" });
            }
        });

        socket.on("sendMessage", async ({ roomId, content }) => {
            const sender = socket.user.userId;
            const message = await Message.create({ roomId, sender, content });
            socket.to(roomId).emit("receiveMessage", message);
        })

        socket.on("disconnect", () => {
            console.log("user disconnected: ", socket.user.userId);
        });
    });
};

module.exports = handleSocket;