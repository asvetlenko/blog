/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var http = require('http'),
    fs = require('fs'),
    chat = require('./chat');


http.createServer(function (req, res) {
    switch (req.url) {
        case '/':
        {
            sendFile('index.html', res);
            break;
        }
        case '/subscribe':
        {
            chat.subscribe(req, res);
            // ...
            break;
        }
        case '/publish':
        {
            var body = '';
            req.on('readable', function () {
                    body += req.read();
                })
                .on('end', function () {
                    try {
                        body = JSON.parse(body);

                        if (body.length > 1e4) {
                            res.statusCode = 413;
                            console.log('ERROR. ', 'Your message is too big for my little chat');
                            res.end('Your message is too big for my little chat');

                            return;
                        }

                    } catch (err) {
                        res.statusCode = 400;
                        res.end('Bad Request');
                        console.log('ERROR. ', 'Bad Request');
                        return;
                    }

                    chat.publish(body.message);
                    console.log('messages was sended');
                    res.end('ok');

                });
            break;
        }
        default:
        {
            res.statusCode = 404;
            res.end('Not found');
        }
    }
}).listen(3000);

function sendFile(fileName, res) {
    var fileStream = fs.createReadStream(fileName);
    fileStream
        .on('error', function () {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('File not found');
                return;
            }
            res.statusCode = 500;
            res.end('Read file error');
        })
        .pipe(res);


    res.on('close', function () { // connection was broken
        fileStream.destroy();
        console.log('responce was closed emergency');
    });
}
