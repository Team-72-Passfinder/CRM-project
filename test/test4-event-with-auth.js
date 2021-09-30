// Run higher order test first
require('./test3-contact-with-auth');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;

//const EventModel = require('../models/event');

chai.use(chaiHttp);
let should = chai.should();

const { userTester, contactTester, eventTester } = require('./test-input');
let token = "";
let contactId1, contactId2;
let eventIdForDelRoute;

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
      });

    mocha.it('Second, create two contacts for use ',
      function (done) {
        chai
          .request(server)
          .post('/contact')
          .auth(token, { type: 'bearer' })
          .send(contactTester.validContact1)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            contactId1 = res.body._id;
            chai
              .request(server)
              .post('/contact')
              .auth(token, { type: 'bearer' })
              .send(contactTester.validContact2)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                contactId2 = res.body._id;
                done();
              });
          });
      });
  });

  mocha.describe('************* CHECK ROUTES WITHOUT AUTH *************', () => {
    mocha.it('it should not give access to GET-USER without a verified token ', function (done) {
      chai
        .request(server)
        .get('/user')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });
    mocha.it('it should not give access to GET without a verified token ', function (done) {
      chai
        .request(server)
        .get('/event/getall')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });
    mocha.it('it should not give access to SEARCH without a verified token ', function (done) {
      chai
        .request(server)
        .get('/event/search')
        .send({ query: "" })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  mocha.describe('************* CHECK ROUTES WITH VERIFIED TOKEN *************', () => {
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
          .send({
            name: 'Coffee with Katie',
            dateTime: '1/1/1234',
            completed: false,
            participants: [contactId1, contactId2],
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('belongsTo');
            res.body.should.have.property('name');
            res.body.should.have.property('dateTime');
            res.body.should.have.property('completed');
            res.body.should.have.property('participants').eql(['Nunu Theboy', 'Koma Komin']);
            eventIdForDelRoute = res.body._id;
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
            res.should.have.status(200);
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

    mocha.describe('/PUT/:id ', () => {
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

    /*
    // This search takes more than 6s
    mocha.describe('/GET/SEARCH route', () => {
      mocha.it('it should perform SEARCH query successfully ', (done) => {
        let query = {
          query: "with",
          from: '1/1/1234',
          to: '1/2/1234',
          participants: [contactId1]
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
    */

    mocha.describe('/DELETE/:id ', () => {
      mocha.it('it should DELETE an event given the id', (done) => {
        chai
          .request(server)
          .delete('/event/' + eventIdForDelRoute)
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

