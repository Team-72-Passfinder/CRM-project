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

app.post(
  '/register',
  passport.authenticate('registration', { session: false }),
  async (req, res) => {
    let token = jwt.sign({ _id: req.user._id }, process.env.PASSPORT_SECRET, {
      expiresIn: '10d',
    });

    return res.json({ token: token });
  }
);

// Other routes from this point require authentication ===========================================
app.use(passport.authenticate('jwt', { session: false }));

app.get('/profile', async (req, res) => {
  res.send(req.user);
});

app.post('/user/change-password', controller.changePassword);

app
  .route('/user')
  .get(controller.findAll)
  .put(controller.update)
  .delete(controller.delete);

app.route('/user/search').get(controller.search);

app
  .route('/user/:id')
  //.put(controller.update)
  //.delete(controller.delete)
  .get(controller.findOne);

module.exports = app;
