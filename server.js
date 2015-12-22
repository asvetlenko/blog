/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var mHttp = require('http'),
    mUrl = require('url'),
    mPath = require('path'),
    mFs = require('fs'),
    mMime = require('mime');

var ROOT = __dirname + '\\public';

mHttp.createServer(function (req, res) {
    if (!checkAccsess(req)) {
        res.statusCode = 403;
        res.end('Tell me the secret to access!');
        return;
    }

    sendFileSafe(mUrl.parse(req.url).pathname, res);
}).listen(1338);

function checkAccsess(req) {
    return mUrl.parse(req.url, true).query.secret === 'o_O';
}

function sendFileSafe(filePath, res) {
    try {
        filePath = decodeURIComponent(filePath);
    } catch (err) {
        res.statusCode = 400;
        res.end('Bad url');
        return;
    }

    if (filePath.indexOf('\0') !== -1) {
        res.statusCode = 400;
        res.end('Bad Request');
        return;
    }

    filePath = mPath.normalize(mPath.join(ROOT, filePath));

    if (filePath.indexOf(ROOT) !== 0) {
        res.statusCode = 404;
        res.end('Wrond file path');
        return;
    }

    mFs.stat(filePath, function (err, stats) {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end('File not found');
            return;
        }

        sendFile3(filePath, res);
    });
}

function sendFile3(filePath, res) {
    var file = new mFs.ReadStream(filePath);
    file.pipe(res);
    //file.pipe(process.stdout);

    file.on('open', function () {
        console.log('EVENT open');
    }).on('end', function () {
        console.log('EVENT end');
    }).on('close', function () {
        console.log('EVENT close');
    }).on('error', function (err) {
        res.statusCode = 404;
        if (err.code === 'ENOENT') {
            res.end('File not found');
            return;
        }
        res.end('Read file error');
    });

    res.on('close', function () { // connection was broken
        file.destroy();
        console.log('responce was closed emergency');
    });
}

function sendFile1(filePath, res) {
    if (err) {
        res.statusCode = 404;
        res.end('Read file error');
        return;
    }

    var mime = mMime.lookup(filePath); // npm install mime
    res.setHeader('Content-Type', mime + '; charset=utf-8'); // text/html image/jpeg
    res.end(content);
}

function sendFile2(filePath, res) {
    var file = new mFs.ReadStream(filePath);
    file.on('readable', write);

    function write() {
        var fileContent = file.read(); // read data
        if (fileContent && !res.write(fileContent)) {
            file.removeListener('readable', write);

            res.once('drain', function () { // we wait
                file.on('readable', write);
                write();
            });
        }
    }

    file.on('end', function () {
        res.end();
    });

    file.on('close', function () {
        res.end();
    });

    file.on('error', function (err) {
        console.log('EVENT error');
        if (err.code === 'ENOENT') {
            console.log('File not found: ', err.message);
        } else {
            console.log('we have strange error:', err);
        }
    });
}

