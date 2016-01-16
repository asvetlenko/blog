/*
 NODE_ENV=development
 DEBUG=blog:*
 NODE_PATH=.
 -----------------
 D:/MongoDB/Server/3.2/bin/mongod.exe --dbpath "D:/MongoDB/db" -v
 D:/alexey/MongoDB/Server/3.2/bin/mongod.exe --dbpath "D:/alexey/MongoDB/db" -v
 -----------------
 */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var favicon = require('serve-favicon');
var config = require('config');
var HttpError = require('common/error').HttpError;
var logger = require('morgan');
var log = require('common/log')(module);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: require('common/sessionStore.js')
})); //connect.sid

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser.js'));


require('routes/index')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    if (typeof err === 'number') { // next(404);
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else if (app.get('env') === 'development') {
        app.use(errorhandler());
    } else {
        log.error(err);
        err = new HttpError(500);
        res.sendHttpError(err);
    }
});

module.exports = app;
