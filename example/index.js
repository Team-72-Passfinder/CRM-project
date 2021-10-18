// THIS WAS USED AS TEMPLATE FOR ESTABLISHING
// ROUTES, CONTROLLERS AND INDEXES
//Testing file, not used in actual production
/*
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const port = 3000;
const config = require('./config');
const examplesRouter = require('./example-route');

const dbUrl = config.dbUrl;

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/examples', examplesRouter);

app.listen(port, function () {
  console.log('Runnning on ' + port);
});
module.exports = app;
*/
