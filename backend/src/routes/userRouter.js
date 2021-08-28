var express = require('express');
var router = express.Router()

var passport = require('passport')
require('../config/passport')(passport)

var jwt = require('jsonwebtoken')

router.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
    const body = { _id: req.user._id }

    jwt.sign(body, process.env.PASSPORT_SECRET, (err, token) => {
        if (err) return res.json(err);

        // Return json web token
        return res.json(token)
    });
})

router.post('/register', passport.authenticate('registration', { session: false }), async (req, res) => {
    if(req.user === null) {
        console.log('yes')
        return res.send('fail')
    }

    const body = { _id: req.user._id }

    jwt.sign(body, process.env.PASSPORT_SECRET, (err, token) => {
        if (err) return res.json(err);

        // Return json web token
        return res.json(token)
    });
})

module.exports = router