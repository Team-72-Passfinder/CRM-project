var express = require('express');
var router = express.Router();

var passport = require('passport');
require('../config/passport');

var jwt = require('jsonwebtoken');

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.send('success');
  }
);

router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  async (req, res) => {
    const body = { _id: req.user._id };

    let token = jwt.sign(body, process.env.PASSPORT_SECRET, {
      expiresIn: '10d',
    });

    return res.json(token);
  }
);

router.post(
  '/register',
  passport.authenticate('registration', { session: false }),
  async (req, res) => {
    let token = jwt.sign({ _id: req.user._id }, process.env.PASSPORT_SECRET, {
      expiresIn: '10d',
    });

    return res.json(token);
  }
);

module.exports = router;
