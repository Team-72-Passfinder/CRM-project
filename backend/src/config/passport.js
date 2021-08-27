var JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
var passport = require('passport')
    , LocalStrategy = require('passport-local')

const User = require('mongoose').model('User')

module.exports = function(passport) {
    passport.use(new JwtCookieComboStrategy({
        secretOrPublicKey: 'StRoNGs3crE7'
    }, (payload, done) => {
        return done(null, payload.user);
    }));

    passport.use('login', new LocalStrategy(
        (username, password, done) => {
            User.findOne({ username: username }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user && user.verifyPassword(password)) {
                    return done(null, user)
                }

                return done(null, false);
            });
    }));

    passport.use('registration', new LocalStrategy({ 
        passReqToCallback: true
    }, function (req, username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false)
                }

                var newUser = new User();

                newUser.username = username
                newUser.password = newUser.hashPassword(password)
                newUser.email = req.body.email
                newUser.firstName = req.body.firstName
                newUser.lastName = req.body.lastName
                newUser.dateOfBirth = req.body.dateOfBirth

                newUser.save();

                return done(null, newUser);
            });
        }
    ))
}