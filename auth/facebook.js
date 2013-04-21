
/**
 * Dependencies
 */

var FacebookStrategy = require('passport-facebook').Strategy,
    db = require('../db');

/**
 * Auth Strategy
 */

module.exports = new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID || require('../config').FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET || require('../config').FACEBOOK_APP_SECRET,
  callbackURL: require('../config').FACEBOOK_CALLBACK_URL
}, function(accessToken, refreshToken, profile, done) {
  db.User.find({
    where: {
      facebookId: profile.id
    }
  }).success(function(user) {

    // User exists
    if(user) return done(null, user);

    // Else Create User
    db.User.build({
      facebookId: profile.id
    }).save().success(function(user) {
      done(null, user);
    }).error(done);

  }).error(done);
});
