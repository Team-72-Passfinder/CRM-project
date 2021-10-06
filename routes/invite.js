const express = require('express');
const app = express();

const controller = require('../controllers/invite');

app.route('/invite').post(controller.SendInvite);