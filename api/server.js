// Stuff that is needed for the api
require('dotenv').config();
require('app-module-path').addPath(__dirname);
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const apiRouter = require('./routes/api/v1');

// App initalization
const app = express();

// Connect to Mongo via mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true
})
.then( ()=> console.log('MongoDB Connected'))
.catch( err => console.error(err));

// MiddleWare
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/v1', apiRouter);

module.exports = app;
