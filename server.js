/**
 * Created by alexey.svetlenko on 18.12.2015.
 */

// module.exports = exports = this

var logger = require('logger')(module);
var db = require('db');
db.connect();

var User = require('./user');

function run() {
    var vasya = new User('Vasya');
    var peter = new User('Peter');

    vasya.hello(peter);

    logger.log(db.getPhrase('Run successful'));
}

if (module.parent) {
    exports.run = run;
} else {
    run();
}
