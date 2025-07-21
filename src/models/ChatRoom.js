const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    order: Number,
    participants: [String],
    createdAt: { type: Date, default: Date.now }
});

ChatRoomSchema.index({ order: 1}, { unique: true });

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);