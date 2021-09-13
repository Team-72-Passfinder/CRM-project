process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const server = require('../server');

const UserModel = require('../models/user');
const EventModel = require('../models/event');

var assert = chai.assert;

mocha.before('Wait for server.js finished loading', function (done) {
  server.app.on('ready', () => {
    done();
  });
});

mocha.describe("Make sure it's the test db", () => {
  mocha.it('Check database name is testDatabase', function (done) {
    assert.equal(UserModel.db.name, 'testDatabase');
    done();
  });
});

mocha.describe('Clean the database before tests', () => {
  mocha.it('Delete user collection', function (done) {
    UserModel.deleteMany({}, done);
  });
  mocha.it('Delete event collection', function (done) {
    EventModel.deleteMany({}, done);
  });
});

mocha.after('Disconnect Server', function (done) {
  server.stop(done());
});
