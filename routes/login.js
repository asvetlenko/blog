/**
 * Created by we on 02-Jan-16.
 */

var router = require('express').Router(),
    User = require('models/user').User,
    error = require('common/error'),
    HttpError = error.HttpError,
    AuthError = error.AuthError,
    async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Login',
        user: req.user
    });
});
/* GET home page. */
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function (err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});
    });

});

module.exports = router;
