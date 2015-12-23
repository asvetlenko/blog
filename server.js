/**
 * Created by alexey.svetlenko on 23.12.2015.
 */

var domain = require('domain'),
    serverDomain = domain.create(),
    server;

serverDomain.on('error', function (err) {
    console.log('server error: ', err);
    if (server) {
        server.close();
    }

    setTimeout(function () {
        process.exit(1);
    }, 1000).unref();
});

serverDomain.run(function () {
    var http = require('http'),
        handler = require('./handler');

    server = http.createServer(function (req, res) {
        var reqDomain = domain.create();
        reqDomain.add(req);
        reqDomain.add(res);

        reqDomain.on('error', function (err) {
            res.statusCode = 500;
            res.end('Sorry, ' + err);
            console.log('Error for req = ', err);
        });

        reqDomain.run(function () {
            handler(req, res);
        });

    }).listen(3000);
});