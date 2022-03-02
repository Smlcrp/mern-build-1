// Dependencies
// .env variables
require('dotenv').config();
const { PORT = 3000, MONGODB_URL } = process.env;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');


// Database Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection
    .on('open', () => console.log('you are connected to mongoose'))
    .on('close', () => console.log('you are disconnected from mongoose'))
    .on('error', (error) => console.log(error));



// Models
const PeopleSchema = new mongoose.Schema({
    name: String,
    img: String,
    title: String,
});

const People = mongoose.model('People', PeopleSchema);



// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



// Routes
//test route
app.get('/', (req, res) => {
    res.send('Hello Worldzzzzzzzzzz');
});

// People Index Route
app.get('/people', async (req, res) => {
    try{
        res.json(await People.find({}));
    }catch (error) {
        res.status(400).json(error);
    }
});

// People Create Route
app.post('/people', async (req, res) => {
    try{
        res.json(await People.create(req.body));
    }catch (error) {
        res.status(400).json(error);
    }
});

// People Update Route
app.put('/people/:id', async (req, res) => {
    try{
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
        )
    }catch (error) {
        res.status(400).json(error);
    }
});

// People Delete Route
app.delete('/people/:id', async (req, res) => {
    try{
        res.json(await People.findByIdAndRemove(req.params.id));
    }catch (error) {
        res.status(400).json(error);
    }
});

// Listener
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));