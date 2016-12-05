const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const passport = require('passport');

const config = require('../config');
const User = require('../models/user');


// Create a Local strategy
const localOps = {
  usernameField: 'email',
};
const localLogin = new LocalStrategy(localOps, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // Compare if 'password' is equal to 'user.password'
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

// JWT strategy config
const jwtOps = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create a JWT strategy
const jwtLogin = new JwtStrategy(jwtOps, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell Passport to use the JWT strategy
passport.use(jwtLogin);
passport.use(localLogin);
