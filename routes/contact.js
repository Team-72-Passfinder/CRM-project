const express = require('express');
const app = express();
const passport = require('../config/passport');
const controller = require('../controllers/contact');
const upload = require('../config/multer');
//const multer = require('multer')
//const upload = multer({ dest: 'uploads/' })

// findAll =  all contacts in DB
app
  .route('/contact')
  .post(passport.authenticate('jwt', { session: false }), upload.single('uploadImage'), controller.create)
  .get(passport.authenticate('jwt', { session: false }), controller.findAll);

// getall = all contacts that belong to current user
app
  .route('/contact/getall')
  .get(passport.authenticate('jwt', { session: false }), controller.getall);

app
  .route('/contact/search')
  .post(passport.authenticate('jwt', { session: false }), controller.search);

app
  .route('/contact/:id')
  .put(passport.authenticate('jwt', { session: false }), upload.single('uploadImage'), controller.update)
  .delete(passport.authenticate('jwt', { session: false }), controller.delete)
  .get(passport.authenticate('jwt', { session: false }), controller.findOne);

app
  .route('/contact/add/:userId')
  .post(passport.authenticate('jwt', { session: false }), controller.addFromId);

module.exports = app;
