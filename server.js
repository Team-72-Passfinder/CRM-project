const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors');

const app = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

dotenv.config();
const port = process.env.port ?? 5000;
const host = process.env.host ?? 'localhost';
const config = require('./config/config');

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

app.listen(port, function () {
  console.log(`⚡Server is running on ${host}:${port}`);
});

app.get('/', function (req, res) {
  res.send('Hellooo Worlddd!');
  res.send(`⚡Server is running on ${host}:${port}`);
});

app.post('/', function (req, res) {
  res.send(req.body.user);
  res.send(req.user.id);
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

require('./models/user');

app.use(require('./routes/userRouter'));
