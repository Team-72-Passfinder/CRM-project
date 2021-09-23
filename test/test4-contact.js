// Run higher order test first
require('./test3-event');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;

const ContactModel = require('../models/contact');

chai.use(chaiHttp);
let should = chai.should();
let contactTesterId = 0;

// Declaring a user to be used for testing

mocha.describe('Test Contact routes', function () {
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
            contactTesterId = res.body[0]._id;
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
      'it should not POST a contact without belongsTo field',
      function (done) {
        let contact = {
          firstName: 'Koma',
          lastName: 'Komin',
        };
        chai
          .request(server)
          .post('/contact')
          .send(contact)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have
              .property('message')
              .eql('Missing or invalid userId that this contact belongs to!');
            done();
          });
      }
    );

    // Normal creation of contact
    mocha.it('it should POST a correct contact ', function (done) {
      let contact = {
        belongsTo: contactTesterId,
        firstName: 'Nunu',
        lastName: 'Theboy',
        email: 'Nunu5i@gmail.com',
        phoneNumber: '193746xxxx',
        dateOfBirth: '2020-02-20',
        biography: '',
      };
      chai
        .request(server)
        .post('/contact/')
        .send(contact)
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
        chai
          .request(server)
          .post('/contact/add/' + contactTesterId)
          // I used the same Id for testing convenience, in production this shouldn't happen
          .send({ contactUserId: contactTesterId })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('belongsTo');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('email');
            res.body.should.have.property('dateOfBirth');
            res.body.should.have.property('optionalUserId');
            done();
          });
      }
    );
  });

  mocha.describe('/GET/getall/:id route', function () {
    mocha.it('it should GET all the contacts of a given user', function (done) {
      chai
        .request(server)
        .get('/contact/getall/' + contactTesterId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2); // Nunu and itself
          done();
        });
    });
  });

  mocha.describe('/GET/:id route', () => {
    mocha.it('it should GET a contact by the given id', (done) => {
      let contact = new ContactModel({
        belongsTo: contactTesterId,
        firstName: 'Koma',
        lastName: 'Komin',
        email: 'Komama@gmail.com',
        phoneNumber: '193746xxxx',
        dateOfBirth: '2020-02-20',
        biography: '',
      });
      contact.save((err, contact) => {
        chai
          .request(server)
          .get('/contact/' + contact.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('belongsTo');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('_id').eql(contact.id);
            done();
          });
      });
    });
  });

  mocha.describe('/PUT/:id user', () => {
    mocha.it('it should UPDATE a contact given the id', (done) => {
      let contact = new ContactModel({
        belongsTo: contactTesterId,
        firstName: 'Leng',
        lastName: 'Ming',
        email: 'lmht@gmail.com',
        phoneNumber: '123746xxxx',
        dateOfBirth: '2020-12-20',
        biography: '',
      });
      contact.save((err, contact) => {
        chai
          .request(server)
          .put('/contact/' + contact.id)
          .send({
            firstName: 'Ding ding',
            lastName: 'Dong dong',
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('belongsTo').eql(contactTesterId);
            res.body.should.have.property('firstName').eql('Ding ding');
            res.body.should.have.property('lastName').eql('Dong dong');
            done();
          });
      });
    });
  });

  mocha.describe('/DELETE/:id user', () => {
    mocha.it('it should DELETE a contact given the id', (done) => {
      let contact = new ContactModel({
        belongsTo: contactTesterId,
        firstName: 'Haa',
        lastName: 'Sugii',
        email: 'Hasugi@gmail.com',
        phoneNumber: '123746xxxx',
        dateOfBirth: '2020-12-20',
        biography: '',
      });
      contact.save((err, contact) => {
        chai
          .request(server)
          .delete('/contact/' + contact.id)
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
