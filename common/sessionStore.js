/**
 * Created by we on 03-Jan-16.
 */

var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('./../common/mongoose');

var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});

module.exports = sessionStore;
