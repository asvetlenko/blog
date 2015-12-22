/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var http = require('http');

var server = new http.Server();

server.on('request', function (req, res) {

    //process.nextTick(function(){
    //    req.on('readable', function(){
    //        console.log('Should execute for near data 1!');
    //        res.end('ok');
    //    });
    //});

    var part = 0;
    setImmediate(function () {
        console.log('Should execute for near data2');
        res.end('ok');
        });

});

server.listen(1337, '127.0.0.1');

var timeoutRef = setTimeout(function () {
    server.close();
    //server.close(function(){ process.exit(); });
    //server.close(function(){ clearInterval(intervalRef); });
}, 2500);

var intervalRef = setInterval(function () {
    console.log('memory usage: ', process.memoryUsage());
}, 1000);

intervalRef.unref();
intervalRef.ref();
