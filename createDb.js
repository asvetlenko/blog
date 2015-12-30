/**
 * Created by we on 30-Dec-15.
 */

//cd D:\alexey\MongoDB\Server\3.2\bin\
//mongod.exe --dbpath "D:\alexey\MongoDB\db" -v

var User = require('./models/user').User;

var user = new User({
    username: "Tester2",
    password: "secret"
});

user.save(function (err, user, affected) {
    if (err) {
        throw err;
    }

    User.findOne({username: "Tester2"}, function (err, tester) {
        console.log('tester: ', tester);
    });
});
