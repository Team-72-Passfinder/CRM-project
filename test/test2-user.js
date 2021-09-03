// Run higher order test first
require('./test1-connection');

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server').app;

chai.use(chaiHttp);
let should = chai.should();

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

mocha.describe('/POST user', () => {
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
          res.body.should.have.property('message');
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
});
