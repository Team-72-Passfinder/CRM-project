// Run higher order test first
require('./test3-event');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;

const ContactModel = require('../models/contact');
const UserModel = require('../models/user');

chai.use(chaiHttp);
let should = chai.should();

// Declaring a user to be used for testing
let user = new UserModel({
  username: 'lilbroluigi',
  password: 'securepassword123',
  email: 'shroomcactus@yahoo.com',
  firstName: 'Luigi',
  lastName: 'Picasso',
  dateOfBirth: '2/2/1235',
});
user.save((err, user) => {

  mocha.describe('Test Contact routes', function () {
    mocha.describe('/GET route', function () {
      mocha.it('it should GET all the contacts of a given user (empty)', function (done) {
        chai
          .request(server)
          .get('/contact/getall/' + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });


    mocha.describe('/POST route', () => {
      mocha.it('it should not POST a contact without belongsTo field', function (done) {
        let contact = {
          firstName: "Koma",
          lastName: "Komin",
        };
        chai
          .request(server)
          .post('/contact')
          .send(contact)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Missing or invalid userId that this contact belongs to!');
            done();
          });
      });

      // Normal creation of contact
      mocha.it('it should POST a correct contact ', function (done) {
        let contact = {
          belongsTo: user.id,
          firstName: "Nunu",
          lastName: "Theboy",
          email: "Nunu5i@gmail.com",
          phoneNumber: "193746xxxx",
          dateOfBirth: "2020-02-20",
          biography: ""
        };
        chai
          .request(server)
          .get('/contact/')
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
      mocha.it('it should POST a correct contact given belongToUserId ', function (done) {
        let contact = {
          userId: user.id,
        };
        chai
          .request(server)
          .get('/contact/' + user.id)
          .send(contact)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('belongsTo');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('email');
            res.body.should.have.property('dateOfBirth');
            done();
          });
      });
    });


    let contact = new ContactModel({
      belongsTo: user.id,
      firstName: "Koma",
      lastName: "Komin",
      email: "Komama@gmail.com",
      phoneNumber: "193746xxxx",
      dateOfBirth: "2020-02-20",
      biography: ""
    });
    contact.save((err, contact) => {

      mocha.describe('/GET/:id route', () => {
        mocha.it('it should GET a contact by the given id', (done) => {
          chai
            .request(server)
            .get('/contact/' + contact.id)
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
              res.body.should.have.property('_id').eql(contact.id);
              done();
            });
        });
      });


      mocha.describe('/PUT/:id user', () => {
        mocha.it('it should UPDATE a contact given the id', (done) => {

          chai
            .request(server)
            .put('/contact/' + contact.id)
            .send({
              phoneNumber: "197389xxxx",
              dateOfBirth: "2020-02-18",
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('belongsTo').eql(user.id);
              res.body.should.have.property('firstName').eql('Koma');
              res.body.should.have.property('lastName').eql('Komin');
              done();
            });
        });
      });


      mocha.describe('/DELETE/:id user', () => {
        mocha.it('it should DELETE a contact given the id', (done) => {
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
  });
});
