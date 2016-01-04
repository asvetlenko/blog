/**
 * Created by we on 02-Jan-16.
 */

var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('frontpage', {
        title: 'Express',
        user: req.user
    });
});

module.exports = router;
