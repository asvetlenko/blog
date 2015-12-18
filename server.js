/**
 * Created by alexey.svetlenko on 18.12.2015.
 */

// module.exports = exports = this

var User = require('./user');

function run() {
    var vasya = new User('Vasya');
    var peter = new User('Peter');

    vasya.hello(peter);
}

if (module.parent) {
    exports.run = run;
} else {
    run();
}
