
/**
 * Dependencies
 */

var bcrypt = require('bcrypt'),
    db = require('../db');

/**
 * GET /login
 */
module.exports.login = function(req, res, next) {
  if(req.user)
    return res.send(req.user);
  res.render('login');
};

/**
 * GET /logout
 */
module.exports.logout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};

/**
 * GET /user.json
 */
module.exports.user = function(req, res, next) {
  res.send(req.user);
};

/**
 * GET /register
 */
module.exports.register = function(req, res, next) {
  res.render('register');
};

/**
 * POST /register
 */
module.exports.registerAction = function(req, res, next) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if(err) return next(err);
    var user = db.User.build({
      name: req.body.username,
      username: req.body.username,
      passwordHash: hash
    }).save().success(function(user) {
      res.redirect('/login');
    }).error(next);
  });
};