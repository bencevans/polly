
module.exports = function(req, res, next) {
  if(req.user)
    return res.send(req.user);
  res.render('index');
};