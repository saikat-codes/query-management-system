const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

//port
app.listen(5000, function () {
    console.log('Server is running on port 5000');
});
