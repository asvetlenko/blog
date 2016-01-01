/**
 * Created by we on 30-Dec-15.
 */

//cd D:\alexey\MongoDB\Server\3.2\bin\
//mongod.exe --dbpath "D:\alexey\MongoDB\db" -v

var mongooose = require('./common/mongoose'),
    async = require('async'),
    User = require('./models/user').User;

mongooose.connection.on('open', function () {
    mongooose.connection.db.dropDatabase(function (err) {
        if (err) {
            throw err;
        }

        async.parallel([
                function (callback) {
                    var user = new User({username: 'Vasiliy', password: 'pi[i[ipi[i'});
                    user.save(function (err, result) {
                        callback(err, user);
                    })
                },
                function (callback) {
                    var user = new User({username: 'Peter', password: 'mimimi'});
                    user.save(function (err, result) {
                        callback(err, user);
                    })
                },
                function (callback) {
                    var user = new User({username: 'Admin', password: 'kikiki'});
                    user.save(function (err, result) {
                        callback(err, user);
                    })
                }],
            function (err, results) {
                if (err) {
                    throw  err;
                }
                console.log('OK. Create users results:', results);

                mongooose.disconnect();
            }
        );
    });
});
