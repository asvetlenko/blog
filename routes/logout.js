/**
 * Created by we on 02-Jan-16.
 */

var router = require('express').Router();

router.get('/', function (req, res, next) {
    var sid = req.session.id;
    var io = req.app.get('io');

    req.session.destroy(function (err) {
        io.sockets.$emit('session:reload', sid);

        if (err) {
            return next(err);
        }

        res.redirect('../');
    });
});

module.exports = router;
