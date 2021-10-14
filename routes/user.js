const express = require('express');
const app = express();

const controller = require('../controllers/user');
const passport = require('../config/passport');

const jwt = require('jsonwebtoken');
//const User = require('mongoose').model('User');

// Login and Register route do not need Auth token ===========================================
app.post(
  '/login',
  passport.authenticate('login', { session: false }),
  async (req, res) => {
    let token = jwt.sign({ _id: req.user._id }, process.env.PASSPORT_SECRET, {
      expiresIn: '10d',
    });

    return res.json({ token: token });
  }
);

// app.post(
//   '/register',
//   passport.authenticate('registration', { session: false }),
//   async (req, res) => {
//     let token = jwt.sign({ _id: req.user._id }, process.env.PASSPORT_SECRET, {
//       expiresIn: '10d',
//     });

//     return res.json({ token: token });
//   }
// );

app.post(
  '/register',
  function (req, res, next) {
    passport.authenticate('registration', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: info.message });
      }

      req.user = user;
      next();
    })(req, res, next);
  },
  async (req, res) => {
    // console.log(req.user);
    let token = jwt.sign({ _id: req.user._id }, process.env.PASSPORT_SECRET, {
      expiresIn: '10d',
    });
    return res.json({ token: token });
  }
);

// Other routes from this point require authentication ===========================================
app.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.send(req.user);
  }
);

app.post(
  '/user/change-password',
  passport.authenticate('jwt', { session: false }),
  controller.changePassword
);

app
  .route('/user')
  .get(passport.authenticate('jwt', { session: false }), controller.findAll)
  .put(passport.authenticate('jwt', { session: false }), controller.update)
  .delete(passport.authenticate('jwt', { session: false }), controller.delete);

app
  .route('/user/search')
  .post(passport.authenticate('jwt', { session: false }), controller.search);

app
  .route('/user/:id')
  .get(passport.authenticate('jwt', { session: false }), controller.findOne);

module.exports = app;
