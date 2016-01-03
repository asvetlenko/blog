/**
 * Created by we on 03-Jan-16.
 */

var log = require('./../common/log')(module);

module.exports = function (server) {

    var io = require('socket.io')(server);

    io.set('origins', 'localhost:*');
//io.set('logger', log);

    io.on('connection', function (socket) {
        socket.on('message', function (text, cb) {
            socket.broadcast.emit('message', text);
            cb({my: 123});
        });
    });
};
