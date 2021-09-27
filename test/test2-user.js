// Run higher order test first
require('./test1-connection');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;

const UserModel = require('../models/user');

chai.use(chaiHttp);
let should = chai.should();

mocha.describe('Test User routes', function () {
  mocha.describe('/GET route', function () {
    mocha.it('it should GET all the users (empty)', function (done) {
      chai
        .request(server)
        .get('/user')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  mocha.describe('/POST route', () => {
    mocha.it(
      'it should not POST a user without firstName field',
      function (done) {
        let user = {
          username: 'pikachu',
          password: '123123123',
          email: 'alo123@gmail.com',
          lastName: 'Chu',
          dateOfBirth: '12/3/1234',
        };
        chai
          .request(server)
          .post('/user')
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have
              .property('message')
              .eql(
                'Missing or invalid firstName!'
              );
            done();
          });
      }
    );
    mocha.it('it should POST a correct user ', function (done) {
      let user = {
        username: 'pikachu',
        password: '123123123',
        email: 'alo123@gmail.com',
        firstName: 'Pokemon',
        lastName: 'Chu',
        dateOfBirth: '12/3/1234',
        biography: 'a very cool lighting pokemonnn!',
      };
      chai
        .request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('password');
          res.body.should.have.property('email');
          res.body.should.have.property('firstName');
          res.body.should.have.property('lastName');
          res.body.should.have.property('dateOfBirth');
          done();
        });
    });
    mocha.it('it should not POST a user with existed email', function (done) {
      let user = {
        username: 'pikachuclone',
        password: '5123125',
        email: 'alo123@gmail.com',
        firstName: 'Pokemon',
        lastName: 'Chu',
        dateOfBirth: '12/3/1234',
      };
      chai
        .request(server)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eql('Email has been registered!');
          done();
        });
    });
  });

  mocha.describe('/GET/:id route', () => {
    mocha.it('it should GET a user by the given id', (done) => {
      let user = new UserModel({
        username: 'contactBro',
        password: 'securepassword123',
        email: 'shroomboy@yahoo.com',
        firstName: 'ContactTester',
        lastName: 'Picasso',
        dateOfBirth: '1/1/1234',
      });
      user.save((err, user) => {
        chai
          .request(server)
          .get('/user/' + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.should.have.property('email');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('dateOfBirth');
            res.body.should.have.property('_id').eql(user.id);
            done();
          });
      });
    });
  });
  mocha.describe('/PUT/:id user', () => {
    mocha.it('it should UPDATE general info of user given the id', (done) => {
      let user = new UserModel({
        username: 'lilbroluigi',
        password: 'securepassword123',
        email: 'shroomcactus@yahoo.com',
        firstName: 'Luigi',
        lastName: 'Picasso',
        dateOfBirth: '2/2/1235',
      });
      user.save((err, user) => {
        chai
          .request(server)
          .put('/user/' + user.id)
          .send({
            firstName: 'Lil Luigi',
            lastName: 'Shroomer',
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName').eql('Lil Luigi');
            res.body.should.have.property('lastName').eql('Shroomer');
            done();
          });
      });
    });
  });
  mocha.describe('/DELETE/:id user', () => {
    mocha.it('it should DELETE a user given the id', (done) => {
      let user = new UserModel({
        username: 'zelda_princess',
        password: 'superman123',
        email: 'hya123@yahoo.com',
        firstName: 'Zelda',
        lastName: 'Pri',
        dateOfBirth: '5/2/1234',
      });
      user.save((err, user) => {
        chai
          .request(server)
          .delete('/user/' + user.id)
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
