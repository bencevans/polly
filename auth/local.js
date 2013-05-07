
/**
 * Dependencies
 */

var LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    db = require('../db');

/**
 * Auth Strategy
 */

module.exports = new LocalStrategy(function(username, password, done) {
  db.User.find({
    where: {
      username: username
    },
    attributes: ['id', 'passwordHash']
  }).success(function(user) {
    if(!user) return done(null, false, { message: 'Unknown Username' });
    bcrypt.compare(password, user.passwordHash, function(err, match) {
      if(err) return done(err);
      if(!match) return done(null, false, { message: 'Incorrect Password' });
      done(null, user);
    });
  }).error(done);
});