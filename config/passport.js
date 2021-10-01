var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

var passport = require('passport'),
  LocalStrategy = require('passport-local');

const User = require('mongoose').model('User');
const Validator = require('../controllers/validator');

// Checks for valid token when performing any route (except login and registration)
passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.PASSPORT_SECRET,
      passReqToCallback: true,
    },
    function (req, jwt_payload, done) {
      User.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
          return done(err, false);
        }

        //console.log(user)

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

// Does the login and returns a token if login successfully
passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (user && user.verifyPassword(password)) {
        return done(null, user);
      }

      return done(null, false);
    });
  })
);

// Does the registration and returns a token if successful
// If any field turns out to be invalid -> get unauthoried
// Message of error is sent to FE
passport.use(
  'registration',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, done) {

      const message = await Validator.checkValidUser(req);
      //console.log(message);
      if (message == 'valid') {
        var newUser = new User();

        newUser.username = username;
        newUser.password = newUser.hashPassword(password);
        newUser.email = req.body.email;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.dateOfBirth = new Date(req.body.dateOfBirth);

        newUser.save();
        return done(null, newUser);
      }
      else {
        return done(null, false, { message: message });
      }

    }
  )
);

module.exports = passport;
