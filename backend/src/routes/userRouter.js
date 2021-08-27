var express = require('express');
var router = express.Router()

var passport = require('passport')
require('../config/passport')(passport)

var jwt = require('jsonwebtoken')

router.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
    jwt.sign({ user: req.user }, 'StRoNGs3crE7', (err, token) => {
        if (err) return res.json(err);

        // Send Set-Cookie header
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: true,
            signed: true,
            secure: true
        });

        // Return json web token
        return res.json({
            jwt: token
        });
    });
})

router.post('/register', passport.authenticate('registration', { session: false }), async (req, res) => {
    if(!req.user) {
        return res.send('fail')
    }

    jwt.sign({ user: req.user }, 'StRoNGs3crE7', (err, token) => {
        if (err) return res.json(err);

        // Send Set-Cookie header
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: true,
            signed: true,
            secure: true
        });

        // Return json web token
        return res.json({
            jwt: token
        });
    });
})

module.exports = router