/*
const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../config/passport');

const passport = require('../config/passport');

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.send(req.user);
  }
);

/*
router.post(
  '/login',
  //passport.authenticate('login', { session: false }),
  async (req, res) => {
    let token = jwt.sign({ _id: req.user._id }, process.env.PASSPORT_SECRET, {
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
*/
