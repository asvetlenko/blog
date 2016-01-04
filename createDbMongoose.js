/**
 * Created by we on 30-Dec-15.
 */

//cd D:\alexey\MongoDB\Server\3.2\bin\
//mongod.exe --dbpath "D:\alexey\MongoDB\db" -v

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chat');

var schema = mongoose.Schema({
    name: String
});
schema.methods.meow = function () {
    console.log('schema methods: ', this.get('name'));
};

var Cat = mongoose.model('Cat', schema); // cats

var kitty = new Cat({
    name: 'Zildjian'
});
kitty.save(function (err, kitty, affected) {
    if (err) {
        throw err;
    }

    kitty.meow();
});