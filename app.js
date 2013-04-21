
/**
 * Dependencies
 */

var express = require('express'),
    app = express(),
    passport = require('passport'),
    requireDir = require('require-dir'),
    db = require('./db');

/**
 * Express Config
 */

for(var key in require('./config')) {
  if(key.match(/^LOCALS_/)) app.locals[key.match(/^LOCALS_(.+)/)[1]] = require('./config')[key];
}

app.configure('development', function() {
  app.use(express.logger('dev'));
});

app.configure(function() {
  app.use(express.static('public'));
  app.set('views', __dirname + '/views');
  app.engine('html', require('hbs').__express);
  app.set('view engine', 'html');
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

/**
 * Load Passport Auth Middleware
 */

var passportMiddleware = requireDir(__dirname + '/auth');
for (var middleware in passportMiddleware) {
  passport.use(passportMiddleware[middleware]);
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.find({
    where: {
      id: id
    }
  }).success(function(user) {
    done(null, user);
  }).error(done);
});


/**
 * Routes
 */


var routes = requireDir(__dirname + '/routes');

app.get('/', routes.index);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get('/auth/facebook', passport.authenticate('facebook', {scope:'publish_actions'}));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);



app.listen(3000);