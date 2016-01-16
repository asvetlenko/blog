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
var favicon = require('serve-favicon');
var logger = require('morgan');
var log = require('common/log')(module);
var HttpError = require('common/error').HttpError;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('routes/index')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    if (typeof err === 'number') { // next(404);
        err = new HttpError(err);
    }

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
