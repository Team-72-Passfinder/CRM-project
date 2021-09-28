// Run higher order test first
require('./test1-connection');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;
//const URI = require('../config/config').bdURI;
//let token = "";


//const UserModel = require('../models/user');
const validUser = {
  username: 'username', password: 'password',
  email: 'fakeemail@gmail.com', firstName: 'fakeFirstName',
  lastName: 'fakeLastName', dateOfBirth: "1980-11-30"
};

const inValidUserLogin = {
  username: 'difusername', password: 'password'
}

const validUserLogin = {
  username: 'username', password: 'password'
}

const preSavedUsername = {
  username: 'username', password: 'fakePassword',
  email: 'mario@mushroom.com', firstName: 'Mar',
  lastName: 'Rio', dateOfBirth: "1999-11-30"
};

const preSavedEmail = {
  username: 'marmar', password: 'fakePassword',
  email: 'fakeemail@gmail.com', firstName: 'Mar',
  lastName: 'Rio', dateOfBirth: "1999-11-30"
};

//const updateUser = { firstName: 'Mar', lastName: 'Rio' };

chai.use(chaiHttp);
let should = chai.should();

mocha.describe('Test User routes', function () {

  mocha.describe('************* AUTH REGISTRATION *************', () => {
    mocha.it(
      'it should not REGISTER a user without firstName field',
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
          .post('/register')
          .send(user)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            done();
          });
      }
    );

    mocha.it('it should REGISTER a correct user ', function (done) {
      chai
        .request(server)
        .post('/register')
        .send(validUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          //token = res.body.token;
          done();
        });
    });

    mocha.it('it should not REGISTER a user with existed username', function (done) {
      chai
        .request(server)
        .post('/register')
        .send(preSavedUsername)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });

    mocha.it('it should not REGISTER a user with existed email', function (done) {
      chai
        .request(server)
        .post('/register')
        .send(preSavedEmail)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  mocha.describe('************* AUTH LOGIN *************', () => {
    mocha.it('it should not LOGIN with incorrect username or password ', function (done) {
      chai
        .request(server)
        .post('/login')
        .send(inValidUserLogin)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          done();
        });
    });

    mocha.it('it should LOGIN with correct username and password ', function (done) {
      chai
        .request(server)
        .post('/login')
        .send(validUserLogin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          //token = res.body.token;
          done();
        });
    });
    /*
    mocha.it('it should show PROFILE of the correct user ', function (done) {
      chai
        .request(server)
        .post('/profile')
        .auth(token, { type: 'bearer' })
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
    });*/
  });

  /*
  mocha.describe('************* AUTH AFTER LOGIN *************', () => {
    mocha.describe('/GET route', function () {
      mocha.it('it should GET all the users (1)', function (done) {
        chai
          .request(server)
          .get('/user')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });

    mocha.describe('/PUT user', () => {
      mocha.it('it should UPDATE general info of the user ', (done) => {
        chai
          .request(server)
          .put('/user')
          //.set({ "Authorization": `Bearer ${token}` })
          .send(updateUser)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName').eql('Mar');
            res.body.should.have.property('lastName').eql('Rio');
            done();
          });
      });
    });

    mocha.describe('/GET/:id route', () => {
      mocha.it('it should GET a user by the given id', (done) => {
        console.log(done);
      });
    });

    mocha.describe('/DELETE user', () => {
      mocha.it('it should DELETE a user given the id', (done) => {
        console.log(done);
      });
    });
  });
  */
});
