// Stuff that is needed for the api
require('dotenv').config();
require('app-module-path').addPath(__dirname);
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const rateLimit = require('express-rate-limit');

// Routes
const apiRouter = require('./routes/api/v1');
const usersRouter = require('./routes/api/v1/users');

// App initalization
const app = express();

// Passport initialization
// Makes passport available throught the app
require('config/passport');

// Configure the rate limiter
const limiter = rateLimit({
    windowMS: 5 * 60 * 1000, // 15 Minutes
    max: 1000, // Limit each IP to 100 requests per 'window'
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

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
app.use(limiter);

if (process.env.NODE_ENV === 'production') {
    app.use(cors({
        origin: "https://sp24-436-ajveteto-donationpal.uc.r.appspot.com"
    }));
} else {
    app.use(cors());
}

app.use('/api/v1', apiRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
