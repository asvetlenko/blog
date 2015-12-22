/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var fs = require('fs');

fs.readFile(__filename + 11, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('File not found.\n message: %s', err.message);
        } else {
            console.log(err);
        }
    } else {
        console.log(data);
        //console.log(data[0]);
        //console.log(data.length);
    }
});
