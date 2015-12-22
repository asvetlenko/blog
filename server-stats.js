/**
 * Created by alexey.svetlenko on 22.12.2015.
 */

var fs = require('fs');

fs.stat(__filename, function (err, data) {
    if (err) throw  err;

    console.log('stats.isFile: ', data.isFile());
    console.log('stats: ', data);
});
