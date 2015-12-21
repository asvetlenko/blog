/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var EventEmitter = require('events').EventEmitter;
var server = new EventEmitter();

var request = {};

server.on('request', function (request) {
    request.approved = true;
});
server.on('request', function (request) {
    console.log(request);
});
server.on('error', function (obj) {
    console.log('proccess error event: ', obj);
});

server.emit('request', {from: 'Client'});
server.emit('request', {from: 'Other clients'});
server.emit('error', new Error("my error"));
