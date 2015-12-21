/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var winston = require('winston');

module.exports = function (module) {
    return makeLogger(module.filename);
};

function makeLogger(path) {
    var transports = [];
    if (path.match(/request.js&/)) {
        transports.push(new winston.transports.Console({
            timestamp: true, // function(){ return new Date().toString() }
            colorize: true,
            level: 'info'
        }));

        transports.push(new winston.transports.File({
            filename: 'debug.log',
            level: 'debug'
        }));
    }

    return new winston.Logger({
        transports: transports
    });
}
