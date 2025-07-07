const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
    sender: String,
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: "메시지를 입력해주세요."
        }
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);