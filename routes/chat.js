/**
 * Created by we on 02-Jan-16.
 */

var router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('chat', {title: 'Express', body: '<h1>hello</h1>'});
});

module.exports = router;