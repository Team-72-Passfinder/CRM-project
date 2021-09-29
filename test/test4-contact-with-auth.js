// Run higher order test first
require('./test3-event-with-auth');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;

//const ContactModel = require('../models/contact');
const UserModel = require('../models/user');

chai.use(chaiHttp);
let should = chai.should();

const { contactTester } = require('./test-input');
let token = "";

// Declaring a user to be used for testing

mocha.describe('************* TEST CONTACT ROUTES *************', function () {
  mocha.describe('Preparation', function () {
    mocha.it('First, create a user for use to test the authentication',
      function (done) {
        chai
          .request(server)
          .post('/register')
          .send(contactTester.newUser)
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
    mocha.it(
      'it should GET all the contacts in the database (empty)',
      function (done) {
        chai
          .request(server)
          .get('/contact')
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

  mocha.describe('/POST route', () => {
    mocha.it(
      'it should not POST a contact without firstName field',
      function (done) {
        chai
          .request(server)
          .post('/contact')
          .auth(token, { type: 'bearer' })
          .send(contactTester.missingFirstName)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have
              .property('message')
              .eql('Missing or invalid firstname!');
            done();
          });
      }
    );

    // Normal creation of contact
    mocha.it('it should POST a correct contact ', function (done) {
      chai
        .request(server)
        .post('/contact/')
        .auth(token, { type: 'bearer' })
        .send(contactTester.validContact)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('belongsTo');
          res.body.should.have.property('firstName');
          res.body.should.have.property('lastName');
          res.body.should.have.property('email');
          res.body.should.have.property('phoneNumber');
          res.body.should.have.property('dateOfBirth');
          done();
        });
    });

    // creation of contact with a given user id
    mocha.it(
      'it should POST a correct contact from an existing User ',
      function (done) {
        let user = new UserModel(contactTester.testUserForPostRoute);
        user.save((err, user) => {
          chai
            .request(server)
            .post('/contact/add/' + user.id)
            .auth(token, { type: 'bearer' })
            // I used the same Id for testing convenience, in production this shouldn't happen
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('belongsTo');
              res.body.should.have.property('firstName');
              res.body.should.have.property('lastName');
              res.body.should.have.property('email');
              res.body.should.have.property('dateOfBirth');
              res.body.should.have.property('optionalUserId').eql(user.id);
              done();
            });
        });
      });
  });

  mocha.describe('/GET/getall route', function () {
    mocha.it('it should GET all the contacts of the user', function (done) {
      chai
        .request(server)
        .get('/contact/getall')
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2); // Nunu(validContact) and newuser
          done();
        });
    });
  });

  mocha.describe('/GET/:id route', () => {
    mocha.it('it should GET a contact by the given id', (done) => {
      chai
        .request(server)
        .post('/contact')
        .auth(token, { type: 'bearer' })
        .send(contactTester.newContactForGetRoute)
        .end((err, res) => {
          chai
            .request(server)
            .get('/contact/' + res.body._id)
            .auth(token, { type: 'bearer' })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('belongsTo');
              res.body.should.have.property('firstName');
              res.body.should.have.property('lastName');
              res.body.should.have.property('_id').eql(res.body._id);
              done();
            });
        });
    });
  });

  mocha.describe('/PUT/:id ', () => {
    mocha.it('it should UPDATE a contact given the id', (done) => {
      chai
        .request(server)
        .post('/contact')
        .auth(token, { type: 'bearer' })
        .send(contactTester.newContactForPutRoute)
        .end((err, res) => {
          chai
            .request(server)
            .put('/contact/' + res.body._id)
            .auth(token, { type: 'bearer' })
            .send(contactTester.updateContact)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('belongsTo');
              res.body.should.have.property('firstName').eql('Ding ding');
              res.body.should.have.property('lastName').eql('Dong dong');
              done();
            });
        });
    });
  });

  mocha.describe('/GET/SEARCH route', () => {
    mocha.it('it should perform SEARCH query successfully ', (done) => {
      let query = {
        query: "kom"
      };
      chai
        .request(server)
        .get('/contact/search')
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

  mocha.describe('/DELETE/:id ', () => {
    mocha.it('it should DELETE a contact given the id', (done) => {
      chai
        .request(server)
        .post('/contact')
        .auth(token, { type: 'bearer' })
        .send(contactTester.newContactForDelRoute)
        .end((err, res) => {
          chai
            .request(server)
            .delete('/contact/' + res.body._id)
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
