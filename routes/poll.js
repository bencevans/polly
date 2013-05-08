
/**
 * Dependencies
 */

var db = require('../db'),
    _ = require('underscore');

/**
 * Helpers
 */

function addslashes( str ) {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function pollById (id, cb) {
  db.Poll.find({
    where: {
      id: id
    }
  }).success(function(poll) {
    cb(null, poll);
  }).error(cb);
}

/**
 * GET /poll/:id
 */
module.exports = function(req, res, next) {
  pollById(req.params.id, function(err, poll) {
    if(err) return next(err);
    if(!poll) return next();
    res.render('poll', poll);
  });
};

/**
 * GET /poll/:id/simple
 */
module.exports.simple = function(req, res, next) {
  pollById(req.params.id, function(err, poll) {
    if(err) return next(err);
    if(!poll) return next();
    res.render('poll', _.extend(poll, {layout:false}));
  });
};

/**
 * GET /poll/:id.js
 */
module.exports.js = function(req, res, next) {
  pollById(req.params.id, function(err, poll) {
    if(err) return next(err);
    if(!poll) return next();
    req.app.render('poll', _.extend(poll, {layout:false}), function(err, html) {
      if(err) return next(err);
      res.type('text/javascript');
      res.send('document.write(\'' + addslashes(html.replace(/\n/g, '')) + '\');');
    });
  });
};

/**
 * POST /poll/:id
 */
module.exports.vote = function(req, res, next) {

  if(!req.body.response) {
    req.flash('Please select a response before submiting');
    return res.redirect(req.path);
  }

  var vote = db.Vote.build({
    response: req.body.response,
    comment: req.body.comment
  }).save().success(function(vote) {
    if(!req.user) {
      req.flash('Your vote has been saved');
      return res.redirect(req.path);
    }
    vote.setUser(req.user).success(function(user) {
      req.flash('Your vote has been saved');
      res.redirect(req.path);
    }).error(next);
  }).error(next);

};