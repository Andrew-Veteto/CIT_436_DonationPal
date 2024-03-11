const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

require('../../../models/User');
const User = mongoose.model('user');

router.get('/', (req, res) => {
    res.send('Hello from the user route');
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.find({ _id: new ObjectId(id)});
    res.json(user);
});

router.post('/register', passport.authenticate('register', {session: false}), async (req, res) => {
    res.status(200).json({
        message: 'Registration successful',
        user: req.user
    });
});

router.post('/login',
    passport.authenticate('login', {session: false, failWithError: true}),
    function (req, res) {
        console.log(req.user);
        const payload = { 
            id: req.user._id, 
            email: req.user.email,
            firstName: req.user.name.first
        };
        const token = jwt.sign( {payload}, process.env.TOP_SECRET_KEY, {expiresIn: '1d'});
        // loginObject ={};
        // loginObject._id = req.user._id;
        // loginObject.email = req.user.email;
        // loginObject.accessToken = token;
        // console.log(loginObject);
        const loginObject = {
            _id: req.user._id,
            email: req.user.email,
            firstName: req.user.name.first,
            accessToken: token
        };
        return res.status(200).json(loginObject);
    },
    function (err, req, res) {
        errorResponse = {
            "error": {
                "name": "LoginError"
            },
            "message":"User not found",
            "statusCode":401,
            "data":[],
            "success":false
        }
        return res.status(401).json(errorResponse);
    }
) 

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json(req.user.email);
})

module.exports = router;