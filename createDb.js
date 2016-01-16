/**
 * Created by we on 30-Dec-15.
 */

//D:\alexey\MongoDB\Server\3.2\bin\mongod.exe --dbpath "D:\alexey\MongoDB\db" -v

var mongooose = require('common/mongoose');
var async = require('async');

mongooose.set('debug', true);

async.series([open, dropDatabase, requireModels, createUsers], function (err, results) {
    if (err) {
        process.exit(255);
        return;
    }

    console.log('results: ', results);
    mongooose.disconnect();
    process.exit(0);
});

function open(callback) {
    mongooose.connection.on('open', callback);
}

function dropDatabase(callback) {
    mongooose.connection.db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models/user');

    async.each(Object.keys(mongooose.models), function (modelName, callback) {
        mongooose.models[modelName].ensureIndexes(callback);
    }, callback)
}

function createUsers(callback) {
    var users = [
        {username: 'Vasiliy', password: 'pi[i[ipi[i'},
        {username: 'Peter', password: 'mimimi'},
        {username: 'admin', password: 'kikiki'}
    ];

    async.each(users, function (userData, callback) {
        var user = mongooose.models.User(userData);
        user.save(callback)
    }, callback);
}
