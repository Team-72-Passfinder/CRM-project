// Run higher order test first
require('./test2-user');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;

const EventModel = require('../models/event');

chai.use(chaiHttp);
let should = chai.should();
let eventTesterId = 0;

// Declaring a user to be used for testing

mocha.describe('Test Event routes', function () {
  mocha.describe('Preparation', function () {
    mocha.it(
      'First, find the user used for security contact testing',
      function (done) {
        chai
          .request(server)
          .get('/user/search')
          .send({ query: 'ContactTester' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            eventTesterId = res.body[0]._id;
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
      let event = {
        dateTime: '1/1/1234',
        completed: false,
      };
      chai
        .request(server)
        .post('/event')
        .send(event)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql(
              'Missing or invalid userId that this contact belongs to!'
            );
          done();
        });
    });
    mocha.it('it should POST a correct event ', function (done) {
      let event = {
        belongsTo: eventTesterId,
        name: 'Coffee with Katie',
        dateTime: '1/1/1234',
        completed: false,
      };
      chai
        .request(server)
        .post('/event')
        .send(event)
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

  mocha.describe('/GET/getall/:id route', function () {
    mocha.it('it should GET all the events of a given user', function (done) {
      chai
        .request(server)
        .get('/event/getall/' + eventTesterId)
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
      let event = new EventModel({
        belongsTo: eventTesterId,
        name: 'Yearly company meeting',
        dateTime: '1/2/1234',
        participants: ['me', 'boss', 'secretary', 'junior'],
        description: 'Fun time',
        completed: true,
      });
      event.save((err, event) => {
        chai
          .request(server)
          .get('/event/' + event.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('belongsTo');
            res.body.should.have.property('name');
            res.body.should.have.property('dateTime');
            res.body.should.have.property('participants');
            res.body.should.have.property('description');
            res.body.should.have.property('completed');
            res.body.should.have.property('_id').eql(event.id);
            done();
          });
      });
    });
  });
  mocha.describe('/PUT/:id user', () => {
    mocha.it('it should UPDATE an event given the id', (done) => {
      let event = new EventModel({
        belongsTo: eventTesterId,
        name: 'Visit big boss Kanye birthday',
        dateTime: '4/2/1245',
        participants: ['me', 'bigboss', 'underling'],
        description: 'Wholesome bro time',
        completed: false,
      });
      event.save((err, event) => {
        chai
          .request(server)
          .put('/event/' + event.id)
          .send({
            name: 'Visit big boss Kanye funeral',
            description: 'sadness',
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have
              .property('name')
              .eql('Visit big boss Kanye funeral');
            res.body.should.have.property('description').eql('sadness');
            done();
          });
      });
    });
  });
  mocha.describe('/DELETE/:id user', () => {
    mocha.it('it should DELETE an event given the id', (done) => {
      let event = new EventModel({
        belongsTo: eventTesterId,
        name: 'Restaurant with myself',
        dateTime: '5/4/1234',
        participants: ['me'],
        description: 'Nothing wrong with dining alone',
        completed: false,
      });
      event.save((err, event) => {
        chai
          .request(server)
          .delete('/event/' + event.id)
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