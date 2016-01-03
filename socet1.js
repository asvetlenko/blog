/**
 * Created by we on 03-Jan-16.
 */

var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static(__dirname + '/socetHtml'));

var server = http.createServer(app);
server.listen(8080);

var webSocketServer = new WebSocketServer({server: server});
webSocketServer.on('connection', function (ws) {
    var timer = setInterval(function () {
        ws.send(JSON.stringify(process.memoryUsage()), function (error) {
            /* handle errors */
        });
    }, 100);

    console.log('Connection of the client');

    ws.on('close', function () {
        console.log('disconetion of the client');
        clearInterval(timer);
    });
});
