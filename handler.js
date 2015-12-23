/**
 * Created by alexey.svetlenko on 23.12.2015.
 */

var mongodb = require('mongodb').createClient();

module.exports = function handler(req, res) {
    if (req.url === '/') {
        mongodb.get('data', process.domain.bind(function (err, data) {
            throw new Error('mondodb callback');
        }));
    } else {
        res.statusCode = 404;
        res.end('File not found');
    }
};