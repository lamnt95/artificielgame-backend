const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    mail: String,
    date: Date,
    message: String
});

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;
