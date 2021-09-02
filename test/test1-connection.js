process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

var assert = chai.assert;

const UserModel = require('../models/user');

chai.use(chaiHttp);

mocha.before('Wait for server.js finished loading', (done) => {
  server.app.on('ready', () => {
    done();
  });
});

mocha.describe("Make sure it's the test db", () => {
  mocha.it('Check database name is testDatabase', (done) => {
    assert.equal(UserModel.db.name, 'testDatabase');
    done();
  });
});

mocha.describe('Clean the database before tests', () => {
  mocha.it('Delete user collection', (done) => {
    UserModel.deleteMany({}, done());
  });
});

mocha.after('Disconnect Server', (done) => {
  server.stop(done());
});
