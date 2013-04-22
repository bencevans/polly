
var db = require('../db');

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