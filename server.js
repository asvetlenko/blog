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
}).listen(1337);

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

        sendFile(filePath, res);
    });
}

function sendFile(filePath, res) {
    mFs.readFile(filePath, function (err, content) {
        if (err) {
            res.statusCode = 404;
            res.end('Read file error');
            return;
        }

        var mime = mMime.lookup(filePath); // npm install mime
        res.setHeader('Content-Type', mime + '; charset=utf-8'); // text/html image/jpeg
        res.end(content);
    });
}

