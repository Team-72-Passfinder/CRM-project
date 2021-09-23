process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const server = require('../server');

const UserModel = require('../models/user');
const EventModel = require('../models/event');
const ContactModel = require('../models/contact');
const RelationshipModel = require('../models/relationship');
const ConversationModel = require('../models/conversation');

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
  mocha.it('Delete contact collection', function (done) {
    ContactModel.deleteMany({}, done);
  });
  mocha.it('Delete relationship collection', function (done) {
    RelationshipModel.deleteMany({}, done);
  });
  mocha.it('Delete conversation collection', function (done) {
    ConversationModel.deleteMany({}, done);
  });
});

mocha.after('Disconnect Server', function (done) {
  server.stop(done());
});
