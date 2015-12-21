/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var http = require('http');

var server = new http.Server(); // EventEmitter

server.listen(1337, '127.0.0.1');

var emit = server.emit;
server.emit = function (event) {
    console.log('server event name: ', event);
    emit.apply(server, arguments);
}

var counter = 0;
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.end('Hellow, world!' + ++counter);
});