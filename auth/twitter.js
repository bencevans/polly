
/**
 * Dependencies
 */

var TwitterStrategy = require('passport-twitter').Strategy,
    db = require('../db');

/**
 * Auth Strategy
 */

module.exports = new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY || require('../config').TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET || require('../config').TWITTER_CONSUMER_SECRET,
  callbackURL: require('../config').TWITTER_CALLBACK_URL
}, function(token, tokenSecret, profile, done) {
  db.User.find({
    where: {
      twitterId: profile.id
    }
  }).success(function(user) {

    // User exists
    if(user) return done(null, user);

    // Else Create User
    db.User.build({
      twitterId: profile.id
    }).save().success(function(user) {
      done(null, user);
    }).error(done);

  }).error(done);
});
