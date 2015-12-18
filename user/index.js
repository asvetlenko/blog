/**
 * Created by alexey.svetlenko on 18.12.2015.
 */

var db = require('../db');


function User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    // ...
    console.log(db.getPhrase('Hello') + ', ' + who.name);
};

// ...

/*
we can know: module.exports = exports = this
or
    module.exports.User = User;
or
    exports.User = User;
or
    this.User = User;
*/

// was exports.User = User;

module.exports = User;