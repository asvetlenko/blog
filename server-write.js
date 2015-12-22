/**
 * Created by alexey.svetlenko on 22.12.2015.
 */

var fs = require('fs');

fs.writeFile('file.tmp', 'data', function (err, data) {
    if (err) throw  err;

    fs.rename('file.tmp', 'new-name.tmp', function (err, data) {
        if (err) throw  err;

        fs.unlink('new-name.tmp', function (err) {
            if (err) throw  err;
        });
    });
});
