/**
 * Created by we on 03-Jan-16.
 */

var express = require('express');
var log = require('common/log')(module);
var config = require('config');
var async = require('async');
var sessionStore = require('common/sessionStore.js');
var User = require('models/user').User;
var HttpError = require('common/error').HttpError;
var ObjectID = require('mongodb').ObjectID;
var cookie = require('cookie');
var cookieParser = require('cookie-parser');


function loadSession(sid, callback) {
    sessionStore.load(sid, function (err, session) {
        if (arguments.length === 0) {
            return callback(null, null);
        } else {
            return callback(null, session);
        }
    });
}

function loadUser(session, callback) {
    if (!session.user) {
        console.log('ERROR! Session %s is anonymous', session.id);
    }

    console.log('retrieving user', session.user);

    User.findById(session.user, function (err, user) {
        if (err) {
            return callback(err);
        }

        if (!user) {
            return callback(null, null);
        }

        console.log('User findById result: ', user);
        callback(null, user);
    });
}

function initSocketCallback(io){
    io.sockets.on('session:reload', function (sid) {
        var username = socket.request.user.get('username');

        clients.forEach(function (client) {
            if (client.request.session.id !== sid) {
                return;
            }

            loadSession(sid, function (err, session) {
                if (err) {
                    client.emit('error', 'server error');
                    client.disconnect();
                    return;
                }

                if (!session) {
                    client.emit('logout');
                    client.disconnect();
                    return;
                }

                client.request.session = session;
            });
        });
    });

    io.sockets.on('connection', function (socket) {
        var username = socket.request.user.get('username');
        socket.broadcast.emit('join', username);


        socket.on('message', function (text, cb) {
            socket.broadcast.emit('message', username, text);
            cb && cb({my: 123});
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('leave', username);
        });
    });
}

module.exports = function (server) {
    var io = require('socket.io')(server);
    io.set('origins', 'localhost:*');
    io.set('logger', log);

    io.set('authorization', function (handshakeData, callback) {
        async.waterfall([
                function (callback) {
                    handshakeData.cookies = cookie.parse(handshakeData.headers.cookie || '');
                    var sidCookie = handshakeData.cookies[config.get('session:key')];
                    var sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));

                    loadSession(sid, callback);
                },
                function (session, callback) {
                    if (!session) {
                        callback(new HttpError(401, 'No session'));
                    }

                    handshakeData.session = session;
                    loadUser(session, callback);
                },
                function (user, callback) {
                    if (!user) {
                        callback(new HttpError(403, 'Any users session may not connect'));
                    }

                    handshakeData.user = user;
                    callback(null);
                }
            ],
            function (err) {
                if (!err) {
                    initSocketCallback(io);
                    return callback(null, true);
                }

                if (err instanceof HttpError) {
                    return callback(null, false);
                }

                callback(err);
            });
    });
    return io;
};
