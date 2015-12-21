/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var url = require('url'),
//debug = require('debug')('server:request')
    log = require('./logger')(module);


module.exports = function (req, res) {
    //res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    //res.end('Hellow, world!');

    var urlParsed = url.parse(req.url, true);

    log.info('Got request: ', req.method, req.url);

    if (urlParsed.pathname === '/echo' && urlParsed.query.message) {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-control': 'no-cache, no-store, must-revalidate'
        });

        log.debug('Echo: ' + urlParsed.query.message);

        //res.setHeader('Cache-control', 'no-cache, no-store, must-revalidate');
        res.write('my data to thread. ');
        res.end(urlParsed.query.message);
    } else {
        log.error('Unknown URL: ' + urlParsed.pathname);

        res.statusCode = 404;
        res.end('Page not found');
    }
};
