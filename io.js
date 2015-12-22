/**
 * Created by alexey.svetlenko on 22.12.2015.
 */

var fs = require('fs');

fs.open(__filename, 'r', function (err, file) {
    console.log('IO');
    if (!err) {
        console.log('__filename', __filename, '; content: ', file);
    }
});

setImmediate(function () {
    console.log('---setImmediate');
});

process.nextTick(function () {
    console.log('---process.nextTick');
});
