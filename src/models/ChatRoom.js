const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    order: Number,
    participants: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);