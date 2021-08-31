require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const cors = require('cors');
const userRoute = require('./routes/user');
const eventRoute = require('./routes/event');
const contactRoute = require('./routes/contact');
const relationshipRoute = require('./routes/relationship');
const conversationRoute = require('./routes/conversation');
const messageRoute = require('./routes/message');
const app = express();

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

const port = process.env.port ?? 5000;
const host = process.env.host ?? 'localhost';

const dbUrl = config.dbUrl;

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

setUpDatabaseStateLog();

// Connect to DB
mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

// Get all routes
app.use(userRoute);
app.use(eventRoute);
app.use(relationshipRoute);
app.use(conversationRoute);
app.use(messageRoute);
app.use(contactRoute);

app.listen(port, function () {
  console.log(`⚡Server is running on ${host}:${port}`);
});

app.get('/', function (req, res) {
  res.send('Hellooo Worlddd!');
  res.send(`⚡Server is running on ${host}:${port}`);
});

/**
 * Setup output readyState and on-event emitters
 */
function setUpDatabaseStateLog() {
  mongoose.connection.on('connecting', () => {
    console.log('Connecting. State: ' + mongoose.connection.readyState); // state 2
  });
  mongoose.connection.on('connected', () => {
    console.log('Connected. State: ' + mongoose.connection.readyState); // state 1
  });
  mongoose.connection.on('disconnecting', () => {
    console.log('Disconnecting. State: ' + mongoose.connection.readyState); // state 3
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected. State: ' + mongoose.connection.readyState); // state 0
  });
}
