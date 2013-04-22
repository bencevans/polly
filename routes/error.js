
module.exports['404'] = function(req, res, next) {
  res.status(404).render('error/404');
};