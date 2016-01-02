/**
 * Created by we on 02-Jan-16.
 */

var router = require('express').Router();

router.post('/', function (req, res, next) {
    req.session.destroy();
    console.log('try to logout....');
    res.redirect('../');
});

module.exports = router;
