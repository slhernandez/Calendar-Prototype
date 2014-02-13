var path = require('path'),
    express = require('express'),
    ejs = require('ejs'),
    stylus = require('stylus'),
    nib = require('nib');

// Create Express and set the port and title
var app = module.exports = express();

// View rendering
app.engine('ejs', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));

// Logging (http://www.senchalabs.org/connect/logger.html) middleware
app.use(express.logger('dev'));

// Stylus middleware with nib support
app.use(stylus.middleware({
  src: app.get('public'),
  dest: app.get('public'),
  compile: function(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib())
      .import('nib');
  }
}));

// Static file middleware (http://www.senchalabs.org/connect/static.html)
app.use(express.static(app.get('public')));

// Initialize the application routes
app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/grid', function(req, res, next) {
  res.render('grid');
});

app.get('/calendar', function(req, res, next) {
  res.render('calendar');
});

// 404 handler
app.use(function(req, res, next) {
  // For now, redirect to index for resources that can't be found
  res.redirect('/');
});

// Error handler
app.use(function(err, req, res, next) {
  console.error('*** Uncaught Error ***');
  console.error(err);
  console.error(err.stack);

  var status;
  if (err instanceof Error && typeof err.status === 'number') status = err.status;
  res.send(status || 500);
});

// Listening on port 8001
app.listen(8001);
console.log('Calendar rendering sandbox listening on port 8001');

