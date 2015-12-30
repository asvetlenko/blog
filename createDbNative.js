/**
 * Created by we on 29-Dec-15.
 */

//cd D:\alexey\MongoDB\Server\3.2\bin\
//mongod.exe --dbpath "D:\alexey\MongoDB\db" -v

var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/chat';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var collection = db.collection('test_insert');
    collection.insert({a: 2}, function (err, doc) {
        collection.count(function (err, count) {
            console.log('coun = %s', count);
        });

        // Locate all the entries using find
        collection.find().toArray(function (err, results) {
            console.dir(results);
            //Let's close the db
            db.close();
        });
    });
});