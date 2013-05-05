
/**
 * Dependencies
 */

var express = require('express'),
    app = express(),
    passport = require('passport'),
    requireDir = require('require-dir'),
    hbs = require('hbs'),
    db = require('./db'),
    redisStore = require((process.env.REDISTOGO_URL) ?
      'connect-heroku-redis' : 'connect-redis'
      )(express);

/**
 * Express Config
 */

for(var key in require('./config')) {
  if(key.match(/^LOCALS_/)) app.locals[key.match(/^LOCALS_(.+)/)[1]] = require('./config')[key];
}

var hbsHelpers = requireDir('./view_helpers');
for(var key in hbsHelpers) {
  hbs.registerHelper(key, hbsHelpers[key]);
}

app.configure('development', function() {
  app.use(express.logger('dev'));
});

app.configure(function() {
  app.use(express.static('public'));
  app.set('views', __dirname + '/views');
  app.engine('html', hbs.__express);
  app.set('view engine', 'html');
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({
    secret: require('./config').EXPRESS_SESSION_SECRET,
    store: new redisStore()
  }));
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

function isAdmin(req, res, next) {
  if(req.user && req.user.admin) return next();
  res.status(404).render('error/404');
}

app.get('*', function(req, res, next) {
  res.locals.user = req.user;
  next();
});

app.get('/', routes.index);
app.get('/poll/:id', routes.poll);
app.get('/poll/:id/simple', routes.poll.simple);
app.get('/admin', isAdmin, function(req, res) {
  res.redirect('/admin/poll');
});
app.get('/admin/user', isAdmin, routes.admin.user.list);
app.get('/admin/poll', isAdmin, routes.admin.poll.list);
app.get('/admin/poll/new', isAdmin, routes.admin.poll.form);
app.get('/admin/poll/:id', isAdmin, routes.admin.poll.form);
app.post('/admin/poll/new', isAdmin, routes.admin.poll.formAction);
app.post('/admin/poll/:id', isAdmin, routes.admin.poll.formAction);
app.get('/admin/poll/:id/destroy', isAdmin, routes.admin.poll.destroy);

app.get('/user.json', function(req, res, next) {
  res.send(req.user);
});

app.get('/login', routes.login);
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

app.all('*', routes.error['404']);


app.listen(3000);