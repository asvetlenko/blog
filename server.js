/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

// http://127.0.0.1/echo?message=Hello -> Hello

var url = require('url');
var http = require('http');

var server = new http.Server(function (req, res) {
    //res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    //res.end('Hellow, world!');

    console.log(req.headers);

    var urlParsed = url.parse(req.url, true);
    if (urlParsed.pathname === '/echo' && urlParsed.query.message) {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-control': 'no-cache, no-store, must-revalidate'
        });
        //res.setHeader('Cache-control', 'no-cache, no-store, must-revalidate');
        res.write('my data to thread. ');
        res.end(urlParsed.query.message);
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
}).listen(1337, '127.0.0.1');
