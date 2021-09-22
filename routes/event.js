const express = require('express');
const app = express();

const controller = require('../controllers/event');

app.route('/event').post(controller.create).get(controller.findAll);
//app.route('/user').post(controller.create).get(controller.findAll).get('/search', controller.search);

app.route('/event/:id').get(controller.findOne);

module.exports = app;
