/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

// http://127.0.0.1/echo?message=Hello -> Hello

var http = require('http'),
//debug = require('debug')('server');
    log = require('./logger')(module);

var server = new http.Server();

server.on('request', require('./request'));

server.listen(1337, '127.0.0.1');

//set DEBUG=server in command line
log.info('Server is Running');
