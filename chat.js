/**
 * Created by alexey.svetlenko on 23.12.2015.
 */

var clients = [];

exports.subscribe = function (req, res) {
    console.log('subscribe');
    clients.push(res);

    res.on('close', function () {
        clients.splice(clients.indexOf(res), 1);
    });

};

exports.publish = function (message) {


    clients.forEach(function (res) {
        res.end(message);
        console.log('publish \'%s\'', message);
    });

    clients = [];
};

setInterval(function () {
    console.log('clients length: %n', clients.length);
}, 2000);
