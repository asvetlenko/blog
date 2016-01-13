/**
 * Created by alexey.svetlenko on 13.01.2016.
 */

var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({file: path.join(__dirname, 'config.json')});

module.exports = nconf;
