const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const RoomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    documents: [{ type: String }], 
    questions: [QuestionSchema], 
    createdAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email : { type: String, required: true},
    rooms: [RoomSchema], 
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
