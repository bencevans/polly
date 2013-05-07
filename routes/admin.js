
/**
 * Dependencies
 */

var db = require('../db'),
    _ = require('underscore');

/**
 * GET /admin
 */
module.exports = function(req, res, next) {
  res.redirect('/admin/poll');
};

module.exports.user = {};

/**
 * GET /admin/user
 */
module.exports.user.list = function(req, res, next) {
  db.User.findAll().success(function(users) {
    users = _.map(users, function(user) {
      user.twitterId = (user.twitterId) ? '<a href="https://twitter.com/intent/user?user_id=' + user.twitterId + '">' + user.twitterId + '</a>' : null;
      user.facebookId = (user.facebookId) ? '<a href="https://facebook.com/' + user.facebookId + '">' + user.facebookId + '</a>' : null;
      return user;
    });
    res.render('admin/user/list', {users:users});
  });
};

module.exports.poll = {};

/**
 * GET /admin/poll
 */
module.exports.poll.list = function(req, res, next) {
  db.Poll.findAll().success(function(polls) {
    polls = _.map(polls, function(poll) {
      poll.id = '<a href="/admin/poll/' + poll.id + '">' + poll.id + '</a>';
      return poll;
    });
    res.render('admin/poll/list', {polls:polls});
  });
};

/**
 * GET /admin/poll/:id/destroy
 */
module.exports.poll.destroy = function(req, res, next) {
  db.Poll.find({
    where: {
      id: req.params.id
    }
  }).success(function(poll) {
    if(!poll) return next();
    poll.destroy().success(function() {
      res.redirect('/admin/poll');
    }).error(next);
  });
};

/**
 * GET /admin/poll/:id
 * GET /admin/poll/new
 */
module.exports.poll.form = function(req, res, next) {

  // If new
  if(!req.params.id) return res.render('admin/poll/edit');

  // else
  db.Poll.find({
    where: {
      id: req.params.id
    }
  }).success(function(poll) {
    if(!poll) return next();
    res.render('admin/poll/edit', poll.values);
  });
};

/**
 * POST /admin/poll/:id
 */
module.exports.poll.formAction = function(req, res, next) {

  for(var i in req.body) {
    if(!req.body[i]) req.body[i] = null;
  }

  if(!req.params.id) {
    // Create
    db.Poll.build(req.body).save().success(function(poll) {
      res.redirect('/admin/poll/' + poll.id);
    }).error(next);
  } else {
    // Update
    db.Poll.find({
      where: {
        id: req.params.id
      }
    }).success(function(poll) {
      if(!poll) return next();
      poll.updateAttributes(req.body).success(function() {
        res.redirect('/admin/poll/' + poll.id);
      }).error(next);
    });
  }
};