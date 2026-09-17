const express = import('express');
const mongoose = import('mongoose');
const bodyParser = import('body-parser');
import('dotenv').config();

const app = express();

mongoose.connect(process.env.MDB_LINK, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const emotionSchema = new mongoose.Schema({
    name: String,
    emotion: String,
    details: String,
    timestamp: Number
});
const Emotion = mongoose.model('Emotion', emotionSchema);

app.use(bodyParser.json({ type: 'application/json' }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    next();
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/emotions', async (req, res) => {
    const { name, emotion, details } = req.body;

    if (!emotion || !details) {
        return res.status(400).send('Duygu ve detaylar eksik.');
    }

    const newEmotion = new Emotion({
        name: name || 'Gizli',
        emotion: emotion,
        details: details,
        timestamp: new Date()
    });

    try {
        await newEmotion.save();
        res.status(200).send('Duygu başarıyla kaydedildi.');
    } catch (ex) {
        console.log(ex)
        res.status(500).send('Bir şeyler yolunda değil.');
    }
});

app.get('/emotions', async (req, res) => {
    try {
        const emotions = await Emotion.find({});
        res.json(emotions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Sunucu hatası!' });
    }
});



app.get('/list-emotions/:page', async (req, res) => {
    const perPage = 15;
    const page = req.params.page || 1;

    try {
        const emotions = await Emotion.find()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();

        const count = await Emotion.countDocuments().exec();

        res.json({
            emotions: emotions,
            currentPage: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (ex) {
        res.status(500).send('Bir şeyler yolunda değil.');
    }
});


app.listen(process.env.PORT || 3000, () => console.log('Server started on port 3000...'));
