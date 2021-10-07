const express = require('express');
const app = express();

const controller = require('../controllers/invite');
const eventContoller = require('../controllers/event');

// First 2 may become obsolete
app.route('/invite').get(controller.SendInvite);

app.route('/invite/:id').get(eventContoller.findOne);

module.exports = app;