/**
 * Created by we on 02-Jan-16.
 */

var HttpError = require('common/error').HttpError;

module.exports = function (req, res, next) {
    if (!req.session.user) {
        return next(new HttpError(401, "You do not authorized"));
    }

    next();
};
