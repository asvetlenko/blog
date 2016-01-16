var async = require('async');
var express = require('express'),
    mongooose = require('common/mongoose'),
    User = require('models/user').User,
    HttpError = require('common/error').HttpError,
    ObjectID = require('mongodb').ObjectID;

var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
    //res.send('respond with a resource');
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        }

        res.json(users);
    });
});

router.get('/:id', function (req, res, next) {
    try {
        var id = new ObjectID(req.params.id);
    } catch (ex) {
        return next(404);
    }

    User.findById(id, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            next(new HttpError(404, 'User not found'));
        } else {
            res.json(user);
        }
    });
});

module.exports = router;
