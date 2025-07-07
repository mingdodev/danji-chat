const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    participants: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);