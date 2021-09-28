// Run higher order test first
require('./test2-user-with-auth');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;

//const EventModel = require('../models/event');

chai.use(chaiHttp);
let should = chai.should();

const { userTester, eventTester } = require('./test-input');
let token = "";

// Declaring a user to be used for testing

mocha.describe('************* TEST EVENT ROUTES *************', function () {
  mocha.describe('Preparation', function () {
    mocha.it('First, create a user for use to test the authentication',
      function (done) {
        chai
          .request(server)
          .post('/register')
          .send(userTester.validUser)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            token = res.body.token;
            done();
          });
      }
    );
  });

  // This API will be deprecated in final version
  mocha.describe('/GET route', function () {
    mocha.it('it should GET all the events (empty)', function (done) {
      chai
        .request(server)
        .get('/event')
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  mocha.describe('/POST route', () => {
    mocha.it('it should not POST an event without name field', function (done) {
      chai
        .request(server)
        .post('/event')
        .auth(token, { type: 'bearer' })
        .send(eventTester.missingName)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Missing event name or event name contains invalid characters!');
          done();
        });
    });
    mocha.it('it should POST a correct event ', function (done) {
      chai
        .request(server)
        .post('/event')
        .auth(token, { type: 'bearer' })
        .send(eventTester.validEvent)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('belongsTo');
          res.body.should.have.property('name');
          res.body.should.have.property('dateTime');
          res.body.should.have.property('completed');
          done();
        });
    });
  });

  mocha.describe('/GET/getall route', function () {
    mocha.it('it should GET all the events of a given user', function (done) {
      chai
        .request(server)
        .get('/event/getall')
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1); // Coffee with Katie
          done();
        });
    });
  });

  mocha.describe('/GET/:id route', () => {
    mocha.it('it should GET an event by the given id', (done) => {
      chai
        .request(server)
        .post('/event')
        .auth(token, { type: 'bearer' })
        .send(eventTester.newEventForGetRoute)
        .end((err, res) => {
          chai
            .request(server)
            .get('/event/' + res.body._id)
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('belongsTo');
              res.body.should.have.property('name');
              res.body.should.have.property('dateTime');
              res.body.should.have.property('participants');
              res.body.should.have.property('description');
              res.body.should.have.property('completed');
              res.body.should.have.property('_id').eql(res.body._id);
              done();
            });
        });
    });
  });

  mocha.describe('/PUT/:id user', () => {
    mocha.it('it should UPDATE an event given the id', (done) => {
      chai
        .request(server)
        .post('/event')
        .auth(token, { type: 'bearer' })
        .send(eventTester.newEventForPutRoute)
        .end((err, res) => {
          chai
            .request(server)
            .put('/event/' + res.body._id)
            .auth(token, { type: 'bearer' })
            .send(eventTester.updateEvent)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have
                .property('name')
                .eql('Visit big boss Kanyes daughter birthday');
              res.body.should.have.property('description').eql('children');
              done();
            });
        });
    });
  });

  mocha.describe('/GET/SEARCH route', () => {
    mocha.it('it should perform SEARCH query successfully ', (done) => {
      let query = {
        query: "with",
        completed: false,
        from: '1/1/1234',
        to: '1/2/1234'
      };
      chai
        .request(server)
        .get('/event/search')
        .auth(token, { type: 'bearer' })
        .send(query)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  mocha.describe('/DELETE/:id user', () => {
    mocha.it('it should DELETE an event given the id', (done) => {
      chai
        .request(server)
        .post('/event')
        .auth(token, { type: 'bearer' })
        .send(eventTester.newEventForDelRoute)
        .end((err, res) => {
          chai
            .request(server)
            .delete('/event/' + res.body._id)
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have
                .property('message')
                .eql('Data is deleted successfully!');
              done();
            });
        });
    });
  });
});

