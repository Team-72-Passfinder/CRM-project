const express = require('express');
const app = express();

const controller = require('../controllers/invite');
const eventContoller = require('../controllers/event');


app.route('/invite/:id').get(eventContoller.findOne).get(controller.SendInvite);

module.exports = app;