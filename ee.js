/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var EventEmitter = require('events').EventEmitter;

var request = {};

var server = new EventEmitter();

server.on('request', function (request) {
    request.approved = true;
});

server.on('request', function (request) {
    console.log(request);
});

server.emit('request', {from: 'Client'});
server.emit('request', {from: 'Other clients'});
server.emit('error');
