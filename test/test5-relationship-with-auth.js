// Run higher order test first
require('./test4-event-with-auth');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;

chai.use(chaiHttp);
let should = chai.should();

const { contactTester, relaTester } = require('./test-input');
let token = "";
let contactId1, contactId2, contactId3;
let relaForDelRoute;

mocha.describe('************* TEST RELATIONSHIP ROUTES *************', function () {
  mocha.describe('Preparation', function () {
    mocha.it('First, create a user for use to test the authentication',
      function (done) {
        chai
          .request(server)
          .post('/register')
          .send(relaTester.newUser)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            token = res.body.token;
            done();
          });
      }
    );

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
    mocha.it('it should not give access to GET without a verified token ', function (done) {
      chai
        .request(server)
        .get('/relationship/getall')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });
    mocha.it('it should not give access to SEARCH without a verified token ', function (done) {
      chai
        .request(server)
        .get('/relationship/search')
        .send({ query: "" })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  mocha.describe('************* CHECK ROUTES WITH VERIFIED TOKEN *************', () => {
    /*
    // This API will be deprecated in final version
    mocha.describe('/GET route', function () {
      mocha.it(
        'it should GET all the contacts in the database (empty)',
        function (done) {
          chai
            .request(server)
            .get('/relationship')
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
              done();
            });
        }
      );
    });
    */

    mocha.describe('/POST route', () => {
      mocha.it(
        'it should not POST a relationship without contactId field',
        function (done) {
          chai
            .request(server)
            .post('/relationship')
            .auth(token, { type: 'bearer' })
            .send(relaTester.missingContact)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have
                .property('message')
                .eql('Require 2 people in relationship!');
              done();
            });
        });

      mocha.it(
        'it should not POST a relationship with duplicate contactIds field',
        function (done) {
          chai
            .request(server)
            .post('/relationship')
            .auth(token, { type: 'bearer' })
            .send({
              people: [contactId1, contactId1],
              startedDatetime: '1-1-2001'
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have
                .property('message')
                .eql('Invalid contact Ids or this relationship has existed!');
              done();
            });
        });

      mocha.it(
        'it should POST a valid relationship successfully ',
        function (done) {
          chai
            .request(server)
            .post('/relationship')
            .auth(token, { type: 'bearer' })
            .send({
              people: [contactId1, contactId2],
              startedDatetime: '1-1-2001',
              tag: ['bestfriends']
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('belongsTo');
              res.body.should.have.property('people');
              res.body.should.have.property('startedDatetime');
              res.body.should.have.property('tag');
              relaForDelRoute = res.body._id;
              done();
            });
        });

      mocha.it(
        'it should not POST an existing relationship ',
        function (done) {
          chai
            .request(server)
            .post('/relationship')
            .auth(token, { type: 'bearer' })
            .send({
              people: [contactId1, contactId2],
              startedDatetime: '1-2-2001'
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have
                .property('message')
                .eql('Invalid contact Ids or this relationship has existed!');
              done();
            });
        });
    });

    mocha.describe('/GET/getall route', function () {
      mocha.it('it should GET all the relationships of the user', function (done) {
        chai
          .request(server)
          .get('/relationship/getall')
          .auth(token, { type: 'bearer' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });

    mocha.describe('/GET/:id route', () => {
      mocha.it('it should GET a relationship by the given id', (done) => {
        chai // create new contact
          .request(server)
          .post('/contact')
          .auth(token, { type: 'bearer' })
          .send(contactTester.validContact3)
          .end((err, res) => {
            res.should.have.status(200);
            contactId3 = res.body._id;
            // create new relationship
            chai.request(server)
              .post('/relationship')
              .auth(token, { type: 'bearer' })
              .send({
                people: [contactId1, contactId3],
                startedDatetime: '1-2-2002'
              })
              .end((err, res) => {
                res.should.have.status(200);
                // test GET + id route
                chai
                  .request(server)
                  .get('/relationship/' + res.body._id)
                  .auth(token, { type: 'bearer' })
                  .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('belongsTo');
                    res.body.should.have.property('people');
                    res.body.should.have.property('startedDatetime');
                    res.body.should.have.property('_id').eql(res.body._id);
                    done();
                  });
              });
          });
      });
    });

    mocha.describe('/PUT/:id ', () => {
      mocha.it('it should UPDATE a relationship given the id', (done) => {
        chai
          // create new relationship for PUT route
          .request(server)
          .post('/relationship')
          .auth(token, { type: 'bearer' })
          .send({
            people: [contactId2, contactId3],
            startedDatetime: '1-2-2002'
          })
          .end((err, res) => {
            //console.log(res.body);
            res.should.have.status(200);
            chai
              .request(server)
              .put('/relationship/' + res.body._id)
              .auth(token, { type: 'bearer' })
              .send({ tag: ['engineers'] })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('belongsTo');
                res.body.should.have.property('tag').eql(['engineers']);
                done();
              });
          });
      });
    });

    mocha.describe('/GET/SEARCH route', () => {
      mocha.it('it should perform SEARCH query successfully ', (done) => {
        chai
          .request(server)
          .get('/relationship/search')
          .auth(token, { type: 'bearer' })
          .send({ query: "engi" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });

    mocha.describe('/DELETE/:id ', () => {
      mocha.it('it should DELETE a relationship given the id', (done) => {
        chai
          .request(server)
          .delete('/relationship/' + relaForDelRoute)
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