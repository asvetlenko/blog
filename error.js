/**
 * Created by alexey.svetlenko on 21.12.2015.
 */

var util = require('util');

var phrases = {
    "hello": "Good morning",
    "world": "to you"
};

// **************************
// message; name; stack;
function PhraseError(message) {
    this.message = message;
    Error.captureStackTrace(this, PhraseError);
}
util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';

function HttpError(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

// **************************

function getPhrase(name) {
    if (phrases[name]) {
        return phrases[name];
    }

    throw new PhraseError('Phrases not found: ' + name); // HTTP 500 notify error
}

function makePage(url) {
    if (url === 'index.html') {
        return util.format('%s %s!', getPhrase('hellou'), getPhrase('world'));
    }

    throw new HttpError(404, 'Page not found: ' + url); // HTTP 404 server error
}

try {
    var page = makePage('index.html1');
    console.log(page);
} catch (err) {
    if (err instanceof PhraseError) {
        console.log('Error name: %s;\n Status: %s; Message: %s; Stack: %s;', err.name, err.status, err.message, err.stack);
    } else if (err instanceof HttpError) {
        console.log('Error name: %s;\n Status: %s; Message: %s; Stack: %s;', err.name, err.status, err.message, err.stack);
    } else {
        throw err;
    }
}


