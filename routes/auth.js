
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