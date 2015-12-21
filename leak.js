/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var db = new EventEmitter();

//db.setMaxListeners(5);

function Request() {
    this.bigData = new Array(1e6).join('*');

    this.send = function (data) {
        console.log('Alexey data: ', data);
    }.bind(this);

    this.onError = function () {
        this.send('I am sorry but we have problems');
    }.bind(this);

    function onData(info) {
        this.send(info);
    }

    onData = onData.bind(this);

    db.on('data', onData); // db.emit

    this.end = function () {
        db.removeListener('data', onData);
    };
}

setInterval(function () {
    //heapdump for analize memory leak
    var request = new Request();
    console.log(process.memoryUsage().heapUsed);
    console.log('---------db:', db);
    //request.end();

}, 200);