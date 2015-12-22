/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

// http://127.0.0.1/echo?message=Hello -> Hello

var http = require('http'),
    fs = require('fs');

var server = new http.Server();

server.on('request', function (req, res) {
    var info;
    if (req.url === '/') {
        info = fs.readFileSync('index.html'); // fs.feadFileSync
        res.end(info);
    } else if (req.url === '/now') {
        res.end(new Date().toString());
    }
});

server.listen(1337, '127.0.0.1');
