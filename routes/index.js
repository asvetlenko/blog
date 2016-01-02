module.exports = function (app) {
    app.use('/', require('./frontpage'));
    app.use('/login', require('./login'));
    app.use('/chat', require('./chat'));
    app.use('/users', require('./users'));
};

