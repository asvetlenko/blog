/**
 * Created by we on 01-Jan-16.
 */

var path = require('path'),
    util = require('util'),
    http = require('http');

//Errors for displaying to visitors
function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error"
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

module.exports.HttpError = HttpError;