// set DEBUG=chat:* & npm start

//cd D:\MongoDB\Server\3.2\bin\
//mongod.exe --dbpath "D:\MongoDB\db" -v

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var HttpError = require('./error').HttpError;
var config = require('./config');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('./common/mongoose');


var routes = require('./routes/index');
// route //var users = require('./routes/users');


var app = express();

// view engine setup
//app.engine('ejs', require('ejs-mate')); //layout partila block
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var sessionStore = require('./common/sessionStore.js');

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: sessionStore
})); //connect.sid

//app.use(function (req, res, next) {
//    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
//    res.send("Visits: " + req.session.numberOfVisits);
//});

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./middleware/middleware.js'));
app.use(require('./middleware/loadUser.js'));

//app.use('/', routes);
// route //app.use('/users', users);
//

routes(app);


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
