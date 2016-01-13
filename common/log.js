/**
 * Created by alexey.svetlenko on 13.01.2016.
 */

var winston = require('winston');
var path = require('path');
var config = require('config');

function getLogger(module) {
    var modulePath = module.filename.split(path.sep).slice(-2).join('/');
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: config.get('NODE_ENV') === 'development' ? 'debug' : 'error',
                label: modulePath
            })
        ]
    });
}

module.exports = getLogger;
