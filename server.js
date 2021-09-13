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
const app = express();
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

// Get all routes
app.use(userRoute);
app.use(eventRoute);
app.use(relationshipRoute);
app.use(conversationRoute);
app.use(contactRoute);

// Authentication
require('./models/user');
app.use(require('./routes/userRouter'));

// Basic route
let server = app.listen(port, function () {
  console.log(`⚡Server is running on ${host}:${port}`);
});
if (process.env.NODE_ENV === 'dev') {
  app.get('/', function (req, res) {
    res.send(`⚡Server is running on ${host}:${port}`);
  });
}

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

initMongooseConnection(() => {
  app.emit('ready');
});

/**
 * Use this function to close everything.
 */
function stop(callback) {
  mongoose.disconnect();
  mongoose.connection.once('close', () => {
    server.close(callback);
  });
}

/**
 * Initialize connection to mongoDB and setup on-event emitters.
 * Callback is usually used in test for done()
 * @param {function} callback
 */
function initMongooseConnection(callback) {
  const dbURI = config.dbURI;

  var options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

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

  // Actual connection part
  mongoose.connect(dbURI, options);
  var db = mongoose.connection;
  db.on('error', (err) => {
    console.log('Failed to connect to database');
    console.log(err);
    process.exit(1);
  });

  db.once('open', () => {
    console.log('DB Name : ' + db.name);
    callback();
  });
}

module.exports = { app, stop, initMongooseConnection };
