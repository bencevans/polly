
/**
 * Dependencies
 */

var db = require('../db'),
    _ = require('underscore');

/**
 * GET /poll/:id
 */
module.exports = function(req, res, next) {
  db.Poll.find({
    where: {
      id: req.params.id
    }
  }).success(function(poll) {
    if(!poll) return next();
    res.render('poll', poll);
  }).error(next);
};

/**
 * GET /poll/:id/simple
 */
module.exports.simple = function(req, res, next) {
  db.Poll.find({
    where: {
      id: req.params.id
    }
  }).success(function(poll) {
    if(!poll) return next();
    res.render('poll', _.extend(poll, {layout:false}));
  }).error(next);
};