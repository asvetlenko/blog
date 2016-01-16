var checkAuth = require('middleware/checkAuth');

module.exports = function (app) {
    app.use('/', require('./frontpage'));
    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));
    app.use('/chat', checkAuth, require('./chat'));
    app.use('/users', require('./users'));
};

