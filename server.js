/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

//node server.js port=3000
//node server.js --port=3000
//supervisor -- server.js --port=3000
//set NODE_ENV=development
//set NODE_ENV=production

var http = require('http'),
    argv = require('minimist')(process.argv.slice(2));

console.log('process.argv: ', process.argv);
console.log('argv: %s; port %s', argv, argv.port);

console.log('proccess.env.HOMEPATH: ', process.env.HOMEPATH);

http.createServer(function (req, res) {
    var myMessage = '';
    if (process.env.NODE_ENV === 'production') {
        myMessage = 'optimization';
    } else if (process.env.NODE_ENV === 'development') {
        myMessage = 'external debugging information';
    }

    res.end('The server is rinnign; ' + myMessage);
}).listen(argv.port);
