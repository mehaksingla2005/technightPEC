const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const JWT_SECRET = 'your_secret_key'; 

const registerUser = async (username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            rooms: []
        });
        await newUser.save();
        return newUser;
    } catch (err) {
        console.error('Error registering user:', err);
    }
};

const loginUser = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return { error: 'User not found' };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { error: 'Invalid password' };
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        return { token, user };
    } catch (err) {
        console.error('Error logging in:', err);
    }
};

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

const addRoom = async (username, roomName) => {
    try {
        const user = await User.findOne({ username });
        if (user) {
            user.rooms.push({ roomName, documents: [], questions: [] });
            await user.save();
            return user;
        }
        return null;
    } catch (err) {
        console.error('Error adding room:', err);
    }
};

const uploadDocument = async (username, roomName, documentPath) => {
    try {
        const user = await User.findOne({ username });
        if (user) {
            const room = user.rooms.find(r => r.roomName === roomName);
            if (room) {
                room.documents.push(documentPath);
                await user.save();
                return room;
            }
        }
        return null;
    } catch (err) {
        console.error('Error uploading document:', err);
    }
};

const addQuestionAnswer = async (username, roomName, question, answer) => {
    try {
        const user = await User.findOne({ username });
        if (user) {
            const room = user.rooms.find(r => r.roomName === roomName);
            if (room) {
                room.questions.push({ question, answer });
                await user.save();
                return room;
            }
        }
        return null;
    } catch (err) {
        console.error('Error adding question and answer:', err);
    }
};

module.exports = { registerUser, loginUser, verifyToken, addRoom, addQuestionAnswer, uploadDocument };
