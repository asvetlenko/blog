/**
 * Created by we on 30-Dec-15.
 */

//cd D:\alexey\MongoDB\Server\3.2\bin\
//mongod.exe --dbpath "D:\alexey\MongoDB\db" -v

var mongooose = require('./common/mongoose'),
//async = require('async'),
    User = require('./models/user').User;

console.log('first readyState: ', mongooose.connection.readyState);

mongooose.connection.on('open', function () {
    console.log('connection open readyState: ', mongooose.connection.readyState);

    mongooose.connection.db.dropDatabase(function (err) {
        if (err) {
            throw err;
        }
        console.log('OK');
        mongooose.disconnect();

        console.log('after disconnect readyState: ', mongooose.connection.readyState);
    });
});
