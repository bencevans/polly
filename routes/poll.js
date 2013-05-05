
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