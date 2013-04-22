
var db = require('../db');

module.exports = function(req, res, next) {
  db.Poll.findAll().success(function(polls) {
    res.render('index', { polls: polls });
  }).error(next);
};