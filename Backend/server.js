const express = require('express');
const mongoose = require('mongoose');
const { registerUser, loginUser, verifyToken, addRoom, uploadDocument, addQuestionAnswer } = require('./controllers/User'); 

const app = express();
app.use(express.json());
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',  // frontend origin
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  

mongoose.connect('mongodb+srv://user_rachit:benten15@cluster0.e1wdtr3.mongodb.net/pdf_search_bot', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await registerUser(username, password);
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    if (result.error) {
        res.status(401).json({ error: result.error });
    } else {
        res.status(200).json({ token: result.token, user: result.user });
    }
});

app.post('/add-room', verifyToken, async (req, res) => {
    const { username, roomName } = req.body;
    const room = await addRoom(username, roomName);
    if (room) {
        res.status(200).json(room);
    } else {
        res.status(404).json({ error: 'Room not found or error occurred' });
    }
});

app.post('/upload-document', verifyToken, async (req, res) => {
    const { username, roomName, documentPath } = req.body;
    const room = await uploadDocument(username, roomName, documentPath);
    if (room) {
        res.status(200).json(room);
    } else {
        res.status(404).json({ error: 'Room not found or error occurred' });
    }
});

app.post('/add-question', verifyToken, async (req, res) => {
    const { username, roomName, question, answer } = req.body;
    const room = await addQuestionAnswer(username, roomName, question, answer);
    if (room) {
        res.status(200).json(room);
    } else {
        res.status(404).json({ error: 'Room not found or error occurred' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
