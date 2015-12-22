/**
 * Created by alexey.svetlenko on 22.12.2015.
 */

var fs = require('fs');

// fs.ReadStream inheritance from stream.Readeble
var stream = new fs.ReadStream(__filename);

stream.on('open', function () {
    console.log('EVENT open');
});

stream.on('readable', function () {
    console.log('EVENT readeble');
    var data = stream.read();
    console.log('data:', data);
});

stream.on('end', function () {
    console.log('EVENT end');
});

stream.on('close', function () {
    console.log('EVENT close');
});

stream.on('error', function (err) {
    console.log('EVENT error');
    if (err.code === 'ENOENT') {
        console.log('File not found: ', err.message);
    } else {
        console.log('we have strange error:', err);
    }
});

//stream.destroy();
