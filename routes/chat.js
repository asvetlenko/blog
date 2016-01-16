/**
 * Created by we on 02-Jan-16.
 */

var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('chat', {
        title: 'Chat'
    });
});

module.exports = router;