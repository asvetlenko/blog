/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var http = require('http'),
    fs = require('fs');

var server = new http.Server();

server.on('request', function (req, res) {
    if (req.url === '/') {
        fs.readFile('index.html', function (err, info) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end("Server error!!!!");
                return;
            }

            res.end(info);
        });
    }
});

server.listen(1337, '127.0.0.1');

var timeoutRef = setTimeout(function () {
    server.close();
}, 2500);

var intervalRef = setInterval(function () {
    console.log('memory usage: ', process.memoryUsage());
}, 1000);
