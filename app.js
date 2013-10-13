
/**
 * Module dependencies.
 */

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var mongoose = require('mongoose');

// Connect to db
mongoose.connect(config.db);

// Get models defined
require('./lib/models/route');

var express = require('express'),
    route = require('./routes/route'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/routes/latest', route.feed);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

require('./lib/scheduler').start();
